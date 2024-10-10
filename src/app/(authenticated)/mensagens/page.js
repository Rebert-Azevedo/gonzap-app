'use client'
import React, { useState, useEffect } from 'react';

function GerenciarMensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState({ nome: '', mensagem: '' });
  const [termoBusca, setTermoBusca] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);

  useEffect(() => {
    exibeMensagem();
    if (!sessionStorage.getItem('token')) {
      window.location.href = '/login';
    }
  }, []);

  const handleAdicionarMensagem = async () => {
    if (novaMensagem.nome && novaMensagem.mensagem) {
      const method = editandoIndex !== null ? 'PUT' : 'POST';
      const url = editandoIndex !== null
        ? `http://localhost:8000/api/mensagens/${mensagens[editandoIndex].id}`
        : 'http://localhost:8000';

      let response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: novaMensagem.nome,
          mensagem: novaMensagem.mensagem
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (editandoIndex !== null) {
          const mensagensAtualizadas = mensagens.map((msg, index) =>
            index === editandoIndex ? { ...msg, nome: novaMensagem.nome, mensagem: novaMensagem.mensagem } : msg
          );
          setMensagens(mensagensAtualizadas);
          setEditandoIndex(null);
        } else {
          const mensagemComId = { id: data.id, nome: novaMensagem.nome, mensagem: novaMensagem.mensagem };
          setMensagens([...mensagens, mensagemComId]);
        }
        setNovaMensagem({ nome: '', mensagem: '' });
      } else {
        console.error('Erro ao adicionar/atualizar a mensagem:', response);
      }
    }
  };

  const handleExcluirMensagem = async (idParaExcluir) => {
    try {
      const response = await fetch(`http://localhost:8000/api/mensagens/${idParaExcluir}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const novasMensagens = mensagens.filter(mensagem => mensagem.id !== idParaExcluir);
        setMensagens(novasMensagens);
      } else {
        const errorData = await response.json();
        console.error('Erro ao excluir a mensagem:', errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Erro de rede ao excluir a mensagem:', error);
    }
  };

  const handleEditarMensagem = (index) => {
    const mensagemParaEditar = mensagens[index];
    setNovaMensagem(mensagemParaEditar);
    setEditandoIndex(index);
  };

  const exibeMensagem = async () => {
    let request = await fetch('http://localhost:8000/gridMensagem').then(response => response.json());

    const mensagemComId = request.map((item) => ({
      id: item.id,
      nome: item.nome,
      mensagem: item.mensagem
    }));

    setMensagens(mensagemComId);
  };

  const mensagensFiltradas = mensagens.filter(mensagem =>
    mensagem.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="ml-[18%] w-[82.5%] flex flex-col items-center px-6 py-4 min-h-screen bg-gray-100">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Mensagens</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome da mensagem"
          value={novaMensagem.nome}
          onChange={(e) => setNovaMensagem({ ...novaMensagem, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
        <textarea
          id="mensagem-texto"
          placeholder="Escreva sua mensagem"
          value={novaMensagem.mensagem}
          onChange={(e) => setNovaMensagem({ ...novaMensagem, mensagem: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
          style={{ height: '140px', resize: 'none' }}
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
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-6 focus:outline-none focus:border-indigo-500"
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
              <tr key={mensagem.id} className="border-b">
                <td className="py-3 px-4 text-gray-800">{mensagem.nome}</td>
                <td className="py-3 px-4 text-indigo-500 break-all" style={{ maxWidth: '200px' }}>{mensagem.mensagem}</td>
                <td className="py-3 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleExcluirMensagem(mensagem.id)}
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
