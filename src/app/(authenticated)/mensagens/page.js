'use client'
import React, { useState } from 'react';

function GerenciarMensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState({ nome: '', mensagem: '' });
  const [termoBusca, setTermoBusca] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null); // Adiciona um estado para controlar o índice da mensagem que está sendo editada

  const handleAdicionarMensagem = () => {
    if (editandoIndex !== null) {
      // Se houver uma mensagem sendo editada, atualize-a
      const novasMensagens = [...mensagens];
      novasMensagens[editandoIndex] = novaMensagem;
      setMensagens(novasMensagens);
      setEditandoIndex(null); // Reseta o índice após a edição
    } else {
      // Adiciona uma nova mensagem
      setMensagens([...mensagens, novaMensagem]);
    }
    setNovaMensagem({ nome: '', mensagem: '' }); // Reseta os campos após adicionar ou editar
  };

  const handleExcluirMensagem = (index) => {
    const novasMensagens = [...mensagens];
    novasMensagens.splice(index, 1);
    setMensagens(novasMensagens);
  };

  const handleEditarMensagem = (index) => {
    const mensagemParaEditar = mensagens[index];
    setNovaMensagem(mensagemParaEditar); // Preenche os campos com a mensagem que está sendo editada
    setEditandoIndex(index); // Armazena o índice da mensagem que está sendo editada
  };

  const mensagensFiltradas = mensagens.filter(mensagem =>
    mensagem.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full px-6 py-4 min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Mensagens</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome da mensagem"
          value={novaMensagem.nome}
          onChange={(e) => setNovaMensagem({ ...novaMensagem, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
        <input
          id="mensagem-texto"
          type="text"
          placeholder="Escreva sua mensagem"
          value={novaMensagem.mensagem}
          onChange={(e) => setNovaMensagem({ ...novaMensagem, mensagem: e.target.value })}
          className="w-full p-3 border text-black border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />

        <button
          onClick={handleAdicionarMensagem}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novaMensagem.nome || !novaMensagem.mensagem
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novaMensagem.nome || !novaMensagem.mensagem}
        >
          {editandoIndex !== null ? 'Salvar Alterações' : 'Adicionar'}
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
            {mensagensFiltradas.map((mensagem, index) => (
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
                  <button
                    onClick={() => handleEditarMensagem(index)}
                    className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                  >
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