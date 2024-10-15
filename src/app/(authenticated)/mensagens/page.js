'use client';
import React, { useState, useEffect } from 'react';

function GerenciarMensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState({ nome: '', mensagem: '' });
  const [termoBusca, setTermoBusca] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const [exibirFeedback, setExibirFeedback] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagemParaExcluir, setMensagemParaExcluir] = useState(null);

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
        : 'http://localhost:8000/api/mensagens';

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
          setMensagemFeedback('Mensagem atualizada com sucesso!');
          setEditandoIndex(null);
        } else {
          const mensagemComId = { id: data.id, nome: novaMensagem.nome, mensagem: novaMensagem.mensagem };
          setMensagens([...mensagens, mensagemComId]);
          setMensagemFeedback('Mensagem adicionada com sucesso!');
        }
        setNovaMensagem({ nome: '', mensagem: '' });
      } else {
        setMensagemFeedback('Erro ao adicionar/atualizar a mensagem.');
      }
      setExibirFeedback(true);
      setTimeout(() => setExibirFeedback(false), 3000);
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
        setMensagemFeedback('Mensagem excluída com sucesso!');
        setExibirFeedback(true);
        setTimeout(() => setExibirFeedback(false), 3000);
        setModalAberto(false);
      } else {
        const errorData = await response.json();
        setMensagemFeedback('Erro ao excluir a mensagem: ' + (errorData.message || response.statusText));
        setExibirFeedback(true);
        setTimeout(() => setExibirFeedback(false), 3000);
      }
    } catch (error) {
      setMensagemFeedback('Erro de rede ao excluir a mensagem: ' + error);
      setExibirFeedback(true);
      setTimeout(() => setExibirFeedback(false), 3000);
    }
  };

  const abrirModalExcluir = (mensagem) => {
    setMensagemParaExcluir(mensagem);
    setModalAberto(true);
  };

  const cancelarExclusao = () => {
    setModalAberto(false);
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

      {/* Feedback de ação */}
      {exibirFeedback && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-10">
          {mensagemFeedback}
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome da mensagem"
          value={novaMensagem.nome}
          onChange={(e) => setNovaMensagem({ ...novaMensagem, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"/>
        <textarea
          id="mensagem-texto"
          placeholder="Escreva sua mensagem"
          value={novaMensagem.mensagem}
          onChange={(e) => setNovaMensagem({ ...novaMensagem, mensagem: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
          style={{ height: '140px', resize: 'none' }}/>

        <button
          onClick={handleAdicionarMensagem}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novaMensagem.nome || !novaMensagem.mensagem
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novaMensagem.nome || !novaMensagem.mensagem}>
          {editandoIndex !== null ? 'Salvar Alterações' : 'Adicionar'}
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
              <th className="py-3 px-4 text-left text-gray-700">Mensagem</th>
              <th className="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mensagensFiltradas.map((mensagem, index) => (
              <tr key={mensagem.id} className="border-b">
                <td className="py-3 px-4 text-gray-800">{mensagem.nome}</td>
                <td className="py-3 px-4 text-gray-800 break-all">{mensagem.mensagem}</td>
                <td className="py-3 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditarMensagem(index)}
                    className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
                    Editar
                  </button>
                  <button
                    onClick={() => abrirModalExcluir(mensagem)}
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
            <h2 className="text-lg text-black text-center font-bold mb-4">Confirmar Exclusão</h2>
            <p className="text-black">Você tem certeza que deseja excluir a mensagem de <strong>{mensagemParaExcluir?.nome}</strong>?</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleExcluirMensagem(mensagemParaExcluir.id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Excluir</button>
              <button onClick={cancelarExclusao} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarMensagens;
