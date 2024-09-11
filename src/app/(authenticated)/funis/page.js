'use client'
import React, { useState } from 'react';

function GerenciarFunis() {
  const [funis, setFunis] = useState([]);
  const [novoFuni, setNovoFuni] = useState({ nome: '', tipo: '', arquivo: null });
  const [termoBusca, setTermoBusca] = useState('');

  // Simulação de arquivos importados anteriormente
  const arquivosImportados = [
    { nome: 'Mensagem 1', tipo: 'mensagem', arquivo: 'mensagem1.txt' },
    { nome: 'Áudio 1', tipo: 'audio', arquivo: 'audio1.mp3' },
    { nome: 'Mídia 1', tipo: 'midia', arquivo: 'midia1.mp4' },
    { nome: 'Documento 1', tipo: 'documento', arquivo: 'documento1.pdf' },
  ];

  const handleAdicionarFuni = () => {
    setFunis([...funis, novoFuni]);
    setNovoFuni({ nome: '', tipo: '', arquivo: null });
  };

  const handleExcluirFuni = (index) => {
    const novosFunis = [...funis];
    novosFunis.splice(index, 1);
    setFunis(novosFunis);
  };

  const handleEditarFuni = (index, novoNome, novoTipo, novoArquivo) => {
    const novosFunis = [...funis];
    novosFunis[index] = { nome: novoNome, tipo: novoTipo, arquivo: novoArquivo };
    setFunis(novosFunis);
  };

  const funisFiltrados = funis.filter(funi =>
    funi.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full px-6 py-4 min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Funis</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome do funil"
          value={novoFuni.nome}
          onChange={(e) => setNovoFuni({ ...novoFuni, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={novoFuni.tipo}
          onChange={(e) => setNovoFuni({ ...novoFuni, tipo: e.target.value })}
          className="w-full p-3 border text-black border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        >
          <option value="">Selecione o tipo de arquivo</option>
          <option value="mensagem">Mensagem</option>
          <option value="audio">Áudio</option>
          <option value="midia">Mídia</option>
          <option value="documento">Documento</option>
        </select>
        <select
          value={novoFuni.arquivo ? novoFuni.arquivo.nome : ''}
          onChange={(e) => {
            const arquivoSelecionado = arquivosImportados.find(arquivo => arquivo.nome === e.target.value);
            setNovoFuni({ ...novoFuni, arquivo: arquivoSelecionado });
          }}
          className="w-full p-3 border text-black border-gray-300 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        >
          <option value="">Selecione o arquivo</option>
          {arquivosImportados.filter(arquivo => arquivo.tipo === novoFuni.tipo).map((arquivo, index) => (
            <option key={index} value={arquivo.nome}>{arquivo.nome}</option>
          ))}
        </select>

        <button
          onClick={handleAdicionarFuni}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novoFuni.nome || !novoFuni.tipo || !novoFuni.arquivo
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novoFuni.nome || !novoFuni.tipo || !novoFuni.arquivo} // desabilita o botão se o nome, tipo ou arquivo estiverem vazios
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
              <th className="py-3 px-4 text-left text-gray-700">Tipo</th>
              <th className="py-3 px-4 text-left text-gray-700">Documento</th>
              <th className="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funisFiltrados.map((funi, index) => (
              <tr key={index}>
                <td className="py-3 px-4">{funi.nome}</td>
                <td className="py-3 px-4">{funi.tipo}</td>
                <td className="py-3 px-4">{funi.arquivo.nome}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleExcluirFuni(index)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => handleEditarFuni(index, funi.nome, funi.tipo, funi.arquivo)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 ml-2"
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

export default GerenciarFunis;