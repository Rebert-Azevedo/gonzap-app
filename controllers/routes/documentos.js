const { app, con, upload } = require('../server');

// Rota para exibir os documentos no grid
app.get('/gridDocumentos', async function (req, res) {
  try {
    let [query] = await con.promise().query('SELECT * FROM documentos');
    res.json(query); // Certifique-se de enviar a resposta como JSON
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).send({ error: 'Erro ao buscar documentos' });
  }
});


// Rota para adicionar um documento
app.post('/api/documentos', upload.single('documento'), async function (req, res) {
  try {
    const nomeDocumento = req.body.nome;
    const arquivoDocumento = req.file.buffer; // Armazenando o arquivo como buffer

    let [query] = await con.promise().query('INSERT INTO documentos (nome, documento) VALUES (?, ?)', [
      nomeDocumento,
      arquivoDocumento
    ]);

    res.send({
      id: query.insertId,
      nome: nomeDocumento,
      documento: req.file.originalname // Retornando apenas o nome do arquivo
    });
  } catch (error) {
    console.error('Erro ao inserir documento:', error);
    res.status(500).send({ error: 'Erro ao inserir documento' });
  }
});

// Rota para excluir um documento
app.delete('/api/documentos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido!' });
    }

    const [result] = await con.promise().execute('DELETE FROM documentos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Documento não encontrado!' });
    }

    return res.status(200).json({ message: 'Documento excluído com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir documento:', err);
    return res.status(500).json({ error: 'Erro ao excluir documento', details: err });
  }
});
