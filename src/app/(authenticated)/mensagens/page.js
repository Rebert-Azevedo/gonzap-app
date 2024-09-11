'use client'
import React, { useState } from 'react';

function GerenciarMensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState({ nome: '', mensagem: '' });
  const [termoBusca, setTermoBusca] = useState('');

  const handleAdicionarMensagem = () => {
    setMensagens([...mensagem, novaMensagem]);
    setNovaMensagem({ nome: '', novaMensagem: '' });
  };

  const handleExcluirMensagem = (index) => {
    const novasMemsagens = [...mensagens];
    novasMensagens.splice(index, 1);
    setMensagens(novasMensagens);
  };

  const handleEditarMensagem = (index, novoNome, novaMensagem) => {
    const novasMensagens = [...mensagens];
    novasMensagens[index] = { nome: novoNome, mensagem: novaMensagem };
    setMensagem(novasMensagens);
  };

  const mensagensFiltradas = mensagens.filter(mensagem =>
    mensagem.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full px-6 py-4  min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Mensagens</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome da mensagem"
          value={novaMensagem.nome}
          onChange={(e) => setNovaMensagem({ ...novaMensagem, nome: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
        <input
          id="mensagem-texto"
          type="text"
          placeholder="Escreva sua mensagem"
          onChange={(e) => {
            const texto = e.target.value;
            setNovoAudio({ ...novoAudio, audioTexto: texto }); // Supondo que você quer armazenar o texto também no estado 'novoAudio'
          }}
          className="border p-2 rounded" // exemplo de estilo
        />

        <div className="w-full flex justify-center mb-4">
          <label
            htmlFor="mensagem-upload"
            className="w-1/2 cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            Selecionar mensagem
          </label>
        </div>

        <button
          onClick={handleAdicionarMensagem}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novaMensagem.nome || !novaMensagem.mensagem
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novaMensagem.nome || !novaMensagem.mensagem} // desabilita o botão se o nome ou a mensagem estiverem vazios
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
              <th className="py-3 px-4 text-left text-gray-700">Mensagem</th>
              <th className="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mensagensFiltradas.map((mensagens, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 text-gray-800">{mensagem.nome}</td>
                <td className="py-3 px-4 text-indigo-500 truncate">{mensagem.mensagem}</td>
                <td className="py-3 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleExcluirMensagem(index)}
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

export default GerenciarMensagens;