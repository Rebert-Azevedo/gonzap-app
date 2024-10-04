'use client';
import React, { useState, useEffect } from 'react';

function GerenciarAudios() {
  const [audios, setAudios] = useState([]);
  const [novoAudio, setNovoAudio] = useState({ nome: '', audio: null });
  const [termoBusca, setTermoBusca] = useState('');

  // Função para exibir áudios
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
    exibeAudio(); // Chama a função para exibir os áudios
  }, []); // Este useEffect chama exibeAudio uma vez ao montar o componente.

  const handleAdicionarAudio = async () => {
    if (novoAudio.nome && novoAudio.audio) {
      console.log('Nome:', novoAudio.nome); // Verifique se está preenchido
      console.log('Audio:', novoAudio.audio); // Verifique se o audio está correto
  
      const formData = new FormData();
      formData.append('nome', novoAudio.nome);
      formData.append('audio', novoAudio.audio); // Este campo deve corresponder ao que está no backend
  
      try {
        let response = await fetch('http://localhost:8000/api/audios', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          const audioComId = { id: data.id, nome: novoAudio.nome, audioURL: URL.createObjectURL(novoAudio.audio) };
          setAudios((prevAudios) => [...prevAudios, audioComId]); // Atualiza o estado corretamente
          setNovoAudio({ nome: '', audio: null });
        } else {
          const errorData = await response.json(); // Capture o corpo da resposta de erro
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
      } else {
        const errorData = await response.json();
        console.error('Erro ao excluir o áudio:', errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Erro de rede ao excluir o áudio:', error);
    }
  };

  return (
    <div className="ml-[18%] w-[82.5%] flex flex-col items-center px-6 py-4 min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Áudios</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome do áudio"
          value={novoAudio.nome}
          onChange={(e) => setNovoAudio({ ...novoAudio, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
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
          className="hidden" // escondendo o input padrão
        />

        <div className="w-full flex justify-center mb-4">
          <label
            htmlFor="audio-upload"
            className="w-1/2 cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            Selecionar áudio
          </label>
        </div>

        <button
          onClick={handleAdicionarAudio}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novoAudio.nome || !novoAudio.audio
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novoAudio.nome || !novoAudio.audio}
        >
          Adicionar
        </button>
      </div>

      <div className="w-full max-w-md mt-8">
        <input
          type="text"
          placeholder="Pesquisar"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-6 focus:outline-none focus:border-indigo-500"
        />

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
              .filter(audio => audio.nome.toLowerCase().includes(termoBusca.toLowerCase())) // Filtra os áudios pela busca
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
                      onClick={() => handleExcluirAudio(audio.id)}  // Usar o ID em vez do index
                      className="text-red-500 font-semibold hover:text-red-600 transition-colors"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GerenciarAudios;
