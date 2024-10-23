'use client';
import React, { useState, useEffect } from 'react';

function GerenciarDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [novoDocumento, setNovoDocumento] = useState({ nome: '', arquivo: null });
  const [termoBusca, setTermoBusca] = useState('');
  const [feedback, setFeedback] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [documentoParaExcluir, setDocumentoParaExcluir] = useState(null);

  useEffect(() => {
    exibeDocumentos();
    if (!sessionStorage.getItem('token')) {
      window.location.href = '/login';
    }
  }, []);

  const handleAdicionarDocumento = async () => {
    if (novoDocumento.nome && novoDocumento.arquivo) {
      const formData = new FormData();
      formData.append('nome', novoDocumento.nome);
      formData.append('documento', novoDocumento.arquivo);

      try {
        let response = await fetch('http://localhost:8000/upload/documentos', {
          method: 'POST',
          // headers: {'Content-Type': 'application/json'},
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const documentoComId = {
            id: data.id,
            nome: novoDocumento.nome,
            documento: novoDocumento.arquivo.name,
          };
          setDocumentos((prevDocumentos) => [...prevDocumentos, documentoComId]);
          setNovoDocumento({ nome: '', arquivo: null });
          setFeedback('Documento adicionado com sucesso!');
          setTimeout(() => setFeedback(''), 3000);
        } else {
          const errorData = await response.json();
          console.error('Erro ao adicionar o documento:', errorData);
          setFeedback(`Erro: ${JSON.stringify(errorData)}`);
        }
      } catch (error) {
        console.error('Erro de rede ao adicionar o documento:', error);
        setFeedback('Erro de rede ao adicionar documento.');
      }
    } else {
      setFeedback('Por favor, forneça um nome e um arquivo para o documento.');
    }
  };

  const handleExcluirDocumento = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/documentos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDocumentos(documentos.filter(doc => doc.id !== id));
        setFeedback('Documento excluído com sucesso!');
        setTimeout(() => setFeedback(''), 3000);
        setModalAberto(false);
      } else {
        const errorData = await response.json();
        setFeedback(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Erro de rede ao excluir o documento:', error);
      setFeedback('Erro de rede ao excluir documento.');
    }
  };

  const exibeDocumentos = async () => {
    try {
      let request = await fetch('http://localhost:8000/gridDocumentos');
      let data = await request.json();
      const documentosComId = data.map((item) => ({
        id: item.id,
        nome: item.nome,
        documento: item.nome
      }));
      setDocumentos(documentosComId);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  const documentosFiltrados = documentos.filter(documento =>
    documento.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const abrirModalExcluir = (documento) => {
    setDocumentoParaExcluir(documento);
    setModalAberto(true);
  };

  const cancelarExclusao = () => {
    setModalAberto(false);
  };

  return (
    <div className="ml-[18%] w-[82.5%] flex flex-col items-center px-6 py-4 min-h-screen">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Gerenciar Documentos</h2>
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
          placeholder="Nome do documento"
          value={novoDocumento.nome}
          onChange={(e) => setNovoDocumento({ ...novoDocumento, nome: e.target.value })}
          className="w-full p-3 border text-black border-gray-400 rounded-md mb-4 focus:outline-none focus:border-indigo-500"/>
        <input
          id="documento-upload"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setNovoDocumento({ ...novoDocumento, arquivo: file });
            }
          }}
          className="hidden"/>

        <div className="w-full flex justify-center mb-4">
          <label
            htmlFor="documento-upload"
            className="w-1/2 cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
            Selecionar documento
          </label>
        </div>

        <button
          onClick={handleAdicionarDocumento}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${!novoDocumento.nome || !novoDocumento.arquivo
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          disabled={!novoDocumento.nome || !novoDocumento.arquivo}>
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
              <th className="py-3 px-4 text-left text-gray-700">Documento</th>
              <th className="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {documentosFiltrados.map((documento) => (
              <tr key={documento.id} className="border-b">
                <td className="py-3 px-4 text-gray-800">{documento.nome}</td>
                <td className="py-3 px-4 text-indigo-500 truncate">{documento.documento}</td>
                <td className="py-3 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => abrirModalExcluir(documento)}
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
            <p className="text-black">Tem certeza de que deseja excluir o documento "{documentoParaExcluir?.nome}"?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  handleExcluirDocumento(documentoParaExcluir.id);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Excluir
              </button>
              <button
                onClick={cancelarExclusao}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarDocumentos;
