'use client'
import React, { useState } from 'react';

function GerenciarFunis() {
  const [funis, setFunis] = useState([]);
  const [novoFunil, setNovoFunil] = useState({ nome: '', arquivos: [] });
  const [termoBusca, setTermoBusca] = useState('');

  // Simulação de arquivos importados anteriormente
  const arquivosImportados = [
    { nome: 'Mensagem 1', tipo: 'mensagem', arquivo: 'mensagem1.txt' },
    { nome: 'Áudio 1', tipo: 'audio', arquivo: 'audio1.mp3' },
    { nome: 'Documento 1', tipo: 'documento', arquivo: 'documento1.pdf' },
  ];

  const handleAdicionarFunil = () => {
    setFunis([...funis, novoFunil]);
    setNovoFunil({ nome: '', arquivos: [] });
  };

  const handleExcluirFunil = (index) => {
    const novosFunis = [...funis];
    novosFunis.splice(index, 1);
    setFunis(novosFunis);
  };

  const handleEditarFunil = (index, novoNome, novosArquivos) => {
    const novosFunis = [...funis];
    novosFunis[index] = { nome: novoNome, arquivos: novosArquivos };
    setFunis(novosFunis);
  };

  const funisFiltrados = funis.filter(funil =>
    funil.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const handleSelecionarArquivo = (arquivoSelecionado) => {
    setNovoFunil(prev => ({
      ...prev,
      arquivos: [...prev.arquivos, arquivoSelecionado],
    }));
  };

  const handleRemoverArquivo = (index) => {
    setNovoFunil(prev => {
      const novosArquivos = [...prev.arquivos];
      novosArquivos.splice(index, 1);
      return { ...prev, arquivos: novosArquivos };
    });
  };

  return (
    <div className="ml-[18%] w-[82.5%] flex flex-col items-center px-6 py-4 min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Funis</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome do funil"
          value={novoFunil.nome}
          onChange={(e) => setNovoFunil({ ...novoFunil, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />

        <select
          onChange={(e) => {
            const arquivoSelecionado = arquivosImportados.find(arquivo => arquivo.nome === e.target.value);
            if (arquivoSelecionado) handleSelecionarArquivo(arquivoSelecionado);
          }}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        >
          <option value="">Selecione o arquivo</option>
          {arquivosImportados.map((arquivo, index) => (
            <option key={index} value={arquivo.nome}>{arquivo.nome}</option>
          ))}
        </select>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-black">Arquivos selecionados:</h3>
          {novoFunil.arquivos.length === 0 ? (
            <p>Nenhum arquivo selecionado.</p>
          ) : (
            <ul>
              {novoFunil.arquivos.map((arquivo, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-black font-bold">{arquivo.nome}</span> {/* Aqui o nome do arquivo é exibido em preto e negrito */}
                  <button
                    onClick={() => handleRemoverArquivo(index)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 ml-2"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleAdicionarFunil}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novoFunil.nome || novoFunil.arquivos.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novoFunil.nome || novoFunil.arquivos.length === 0}
        >
          Adicionar Funil
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
              <th className="py-3 px-4 text-left text-gray-700">Arquivos</th>
              <th className="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funisFiltrados.map((funil, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-black">{funil.nome}</td>
                <td className="py-3 px-4 text-black">
                  {funil.arquivos.map((arquivo, i) => {
                    <p key={1} className='text-black font-bold'>{arquivo.nome}</p>
                  })}

                </td>
                <td className="py-3 px-4 text-black text-center">
                  <button
                    onClick={() => handleExcluirFunil(index)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => handleEditarFunil(index, funil.nome, funil.arquivos)}
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
