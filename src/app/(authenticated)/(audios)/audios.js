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
    <div>
      <h2>Gerenciar Áudios</h2>

      <input
        type="text"
        placeholder="Nome do áudio"
        value={novoAudio.nome}
        onChange={e => setNovoAudio({ ...novoAudio, nome: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL do áudio"
        value={novoAudio.audio}
        onChange={e => setNovoAudio({ ...novoAudio, audio: e.target.value })}
      />
      <button onClick={handleAdicionarAudio}>Adicionar</button>

      <input
        type="text"
        placeholder="Pesquisar"
        value={termoBusca}
        onChange={e => setTermoBusca(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Áudio</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {audiosFiltrados.map((audio, index) => (
            <tr key={index}>
              <td>{audio.nome}</td>
              <td>{audio.audio}</td>
              <td>
                {/* Implementar component para editar e excluir */}
                <button onClick={() => handleExcluirAudio(index)}>Excluir</button>
                <button>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GerenciarAudios;