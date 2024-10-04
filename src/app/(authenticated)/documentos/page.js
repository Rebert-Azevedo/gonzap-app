'use client';
import React, { useState } from 'react';

function GerenciarDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [novoDocumento, setNovoDocumento] = useState({ nome: '', arquivo: null });
  const [termoBusca, setTermoBusca] = useState('');

  const handleAdicionarDocumento = async () => {
    // Corrigido para usar 'arquivo' em vez de 'documento'
    if (novoDocumento.nome && novoDocumento.arquivo) {
      console.log('Nome:', novoDocumento.nome);
      console.log('Arquivo:', novoDocumento.arquivo);

      const formData = new FormData();
      formData.append('nome', novoDocumento.nome);
      formData.append('documento', novoDocumento.arquivo); // Certifique-se de que o nome está correto

      try {
        let response = await fetch('http://localhost:8000/api/documentos', {
          method: 'POST',
          body: formData,
        });

        console.log('Resposta do servidor:', response); // Log da resposta do servidor para debug

        if (response.ok) {
          const data = await response.json();
          console.log('Dados retornados:', data); // Log dos dados retornados

          const documentoComId = { id: data.id, nome: novoDocumento.nome, documento: novoDocumento.arquivo.name }; // Exibindo o nome do arquivo
          setDocumentos((prevDocumentos) => [...prevDocumentos, documentoComId]);
          setNovoDocumento({ nome: '', arquivo: null }); // Resetando o formulário
        } else {
          const errorData = await response.json();
          console.error('Erro ao adicionar o documento:', errorData);
        }
      } catch (error) {
        console.error('Erro de rede ao adicionar o documento:', error);
      }
    } else {
      console.error('Nome ou arquivo do documento não fornecido.');
    }
  };

  const handleExcluirDocumento = (index) => {
    const novosDocumentos = [...documentos];
    novosDocumentos.splice(index, 1);
    setDocumentos(novosDocumentos);
  };

  const documentosFiltrados = documentos.filter(documento =>
    documento.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="ml-[18%] w-[82.5%] flex flex-col items-center px-6 py-4 min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Documentos</h2>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Nome do documento"
          value={novoDocumento.nome}
          onChange={(e) => setNovoDocumento({ ...novoDocumento, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
        />
        <input
          id="documento-upload"
          type="file"
          accept=".pdf,.doc,.docx,.txt" // Altere conforme os tipos de arquivos permitidos
          onChange={(e) => {
            const file = e.target.files[0]; // Seleciona o primeiro arquivo escolhido
            if (file) {
              setNovoDocumento({ ...novoDocumento, arquivo: file });
              console.log('Arquivo selecionado:', file.name);
            }
          }}
          className="hidden" // Escondendo o input padrão se estiver usando um botão personalizado
        />

        <div className="w-full flex justify-center mb-4">
          <label
            htmlFor="documento-upload"
            className="w-1/2 cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            Selecionar documento
          </label>
        </div>

        <button
          onClick={handleAdicionarDocumento}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novoDocumento.nome || !novoDocumento.arquivo
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novoDocumento.nome || !novoDocumento.arquivo} // desabilita o botão se o nome ou o arquivo estiverem vazios
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
              <th className="py-3 px-4 text-left text-gray-700">Documento</th>
              <th className="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {documentosFiltrados.map((documento, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 text-gray-800">{documento.nome}</td>
                <td className="py-3 px-4 text-indigo-500 truncate">{documento.documento}</td>
                <td className="py-3 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleExcluirDocumento(index)}
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

export default GerenciarDocumentos;
