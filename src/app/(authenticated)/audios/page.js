'use client'
import React, { useState } from 'react';

function GerenciarAudios() {
  const [audios, setAudios] = useState([]);
  const [novoAudio, setNovoAudio] = useState({ nome: '', audio: '' });
  const [termoBusca, setTermoBusca] = useState('');

  const handleAdicionarAudio = () => {
    setAudios([...audios, novoAudio]);
    setNovoAudio({ nome: '', audio: '' });
  };

  const handleExcluirAudio = (index) => {
    const novosAudios = [...audios];
    novosAudios.splice(index, 1);
    setAudios(novosAudios);
  };

  const handleEditarAudio = (index, novoNome, novoAudio) => {
    const novosAudios = [...audios];
    novosAudios[index] = { nome: novoNome, audio: novoAudio };
    setAudios(novosAudios);
  };

  const audiosFiltrados = audios.filter(audio =>
    audio.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full px-6 py-4  min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Áudios</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome do áudio"
          value={novoAudio.nome}
          onChange={(e) => setNovoAudio({ ...novoAudio, nome: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="URL do áudio"
          value={novoAudio.audio}
          onChange={(e) => setNovoAudio({ ...novoAudio, audio: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleAdicionarAudio}
          className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition-colors"
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
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:border-indigo-500"
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
            {audiosFiltrados.map((audio, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 text-gray-800">{audio.nome}</td>
                <td className="py-3 px-4 text-indigo-500 truncate">{audio.audio}</td>
                <td className="py-3 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleExcluirAudio(index)}
                    className="text-red-500 font-semibold hover:text-red-600 transition-colors"
                  >
                    Excluir
                  </button>
                  <button className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
                    Editar
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