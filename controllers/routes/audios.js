const { app, con, upload } = require('../server');

// Rota para mostrar os áudios no grid
app.get('/gridAudios', async function (req, res) {
  try {
    let [query] = await con.promise().query('SELECT * FROM audios');
    res.send(query);
  } catch (error) {
    console.error('Erro ao recuperar áudios:', error);
    res.status(500).send({ error: 'Erro ao recuperar áudios' });
  }
});

// Rota para adicionar áudio
app.post('/api/audios', upload.single('audio'), async function (req, res) {
  try {
    const nomeAudio = req.body.nome;
    const arquivoAudio = req.file.buffer; // O buffer do arquivo

    let [query] = await con.promise().query('INSERT INTO audios (nome, audio) VALUES (?, ?)', [
      nomeAudio,
      arquivoAudio,
    ]);

    res.send({
      id: query.insertId,
      nome: nomeAudio,
      audio: arquivoAudio,
    });
  } catch (error) {
    console.error('Erro ao inserir áudio:', error);
    res.status(500).send({ error: 'Erro ao inserir áudio' });
  }
});

// Rota para excluir um áudio
app.delete('/api/audios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido!' });
    }

    const [result] = await con.promise().execute('DELETE FROM audios WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Áudio não encontrado!' });
    }

    return res.status(200).json({ message: 'Áudio excluído com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir áudio:', err);
    return res.status(500).json({ error: 'Erro ao excluir o áudio', details: err });
  }
});
