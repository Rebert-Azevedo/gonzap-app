'use client';
import React, { useState, useEffect } from 'react';

function GerenciarAudios() {
  const [audios, setAudios] = useState([]);
  const [novoAudio, setNovoAudio] = useState({ nome: '', audio: null });
  const [termoBusca, setTermoBusca] = useState('');
  const [feedback, setFeedback] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [audioParaExcluir, setAudioParaExcluir] = useState(null);

  const exibeAudio = async () => {
    try {
      let response = await fetch('http://localhost:8000/gridAudios');
      if (response.ok) {
        let data = await response.json();
        const audiosComUrls = data.map((audio) => ({
          id: audio.id,
          nome: audio.nome,
          audioURL: `data:audio/mpeg;base64,${Buffer.from(audio.audio).toString('base64')}`,
        }));
        setAudios(audiosComUrls);
      }
    } catch (error) {
      console.error('Erro ao carregar áudios:', error);
    }
  };

  useEffect(() => {
    exibeAudio();
    if (!sessionStorage.getItem('token')) {
      window.location.href = '/login';
    }
}, []);

  const handleAdicionarAudio = async () => {
    if (novoAudio.nome && novoAudio.audio) {
      const formData = new FormData();
      formData.append('nome', novoAudio.nome);
      formData.append('audio', novoAudio.audio);

      try {
        let response = await fetch('http://localhost:8000/api/audios', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const audioComId = { id: data.id, nome: novoAudio.nome, audioURL: URL.createObjectURL(novoAudio.audio) };
          setAudios((prevAudios) => [...prevAudios, audioComId]);
          setNovoAudio({ nome: '', audio: null });
          setFeedback('Áudio adicionado com sucesso!');
          setTimeout(() => setFeedback(''), 3000);
        } else {
          const errorData = await response.json();
          console.error('Erro ao adicionar o áudio:', errorData);
        }
      } catch (error) {
        console.error('Erro de rede ao adicionar o áudio:', error);
      }
    }
  };

  const handleExcluirAudio = async (idParaExcluir) => {
    try {
      const response = await fetch(`http://localhost:8000/api/audios/${idParaExcluir}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const novosAudios = audios.filter(audio => audio.id !== idParaExcluir);
        setAudios(novosAudios);
        setFeedback('Áudio excluído com sucesso!');
        setTimeout(() => setFeedback(''), 3000);
        setModalAberto(false);
      } else {
        const errorData = await response.json();
        console.error('Erro ao excluir o áudio:', errorData.message || response.statusText);
}
    } catch (error) {
      console.error('Erro de rede ao excluir o áudio:', error);
    }
  };

  const abrirModalExcluir = (audio) => {
    setAudioParaExcluir(audio);
    setModalAberto(true);
  };

  const cancelarExclusao = () => {
    setModalAberto(false); // Fecha o modal ao cancelar
  };

  return (
    <div className="ml-[18%] w-[82.5%] flex flex-col items-center px-6 py-4 min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Áudios</h2>
      </div>

      {/* Feedback de ação */}
      {feedback && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-10">
          {feedback}
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome do áudio"
          value={novoAudio.nome}
          onChange={(e) => setNovoAudio({ ...novoAudio, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"/>
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setNovoAudio({ ...novoAudio, audio: file });
            }
          }}
          className="hidden"/>

        <div className="w-full flex justify-center mb-4">
          <label
            htmlFor="audio-upload"
            className="w-1/2 cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
            Selecionar áudio
          </label>
        </div>

        <button
          onClick={handleAdicionarAudio}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novoAudio.nome || !novoAudio.audio
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novoAudio.nome || !novoAudio.audio}>
          Adicionar
        </button>
      </div>

      <div className="w-full max-w-md mt-8">
        <input
          type="text"
          placeholder="Pesquisar"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-6 focus:outline-none focus:border-indigo-500"/>

        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">Nome</th>
              <th className="py-3 px-4 text-left text-gray-700">Áudio</th>
              <th className="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {audios
              .filter(audio => audio.nome.toLowerCase().includes(termoBusca.toLowerCase()))
              .map((audio) => (
                <tr key={audio.id} className="border-b">
                  <td className="py-3 px-4 text-gray-800">{audio.nome}</td>
                  <td className="py-3 px-4 text-indigo-500 truncate">
                    {audio.audioURL ? (
                      <audio controls>
                        <source src={audio.audioURL} type="audio/mpeg" />
                        Seu navegador não suporta o elemento de áudio.
                      </audio>
                    ) : (
                      'Sem áudio'
                    )}
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-4">
                    <button
                      onClick={() => abrirModalExcluir(audio)}
                      className="text-red-500 font-semibold hover:text-red-600 transition-colors">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmação de exclusão */}
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg text-black text-center font-bold mb-4">Confirmar Exclusão</h3>
            <p className="text-black">Tem certeza de que deseja excluir o áudio "{audioParaExcluir?.nome}"?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  handleExcluirAudio(audioParaExcluir.id);
                  setModalAberto(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Excluir
              </button>
              <button
                onClick={cancelarExclusao}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarAudios;
