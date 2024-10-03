const { app, con, upload } = require('../server');

// Rota para adicionar um documento
app.post('/api/documentos', upload.single('documento'), async function (req, res) { // Corrigido aqui
    try {
      const nomeDocumento = req.body.nome;
      const arquivoDocumento = req.file.buffer; // Corrigido aqui
  
      let [query] = await con.promise().query('INSERT INTO documentos (nome, documento) VALUES (?, ?)', [
        nomeDocumento,
        arquivoDocumento
      ]);
  
      res.send({
        id: query.insertId,
        nome: nomeDocumento,
        documento: arquivoDocumento
      });
    } catch (error) {
      console.error('Erro ao inserir documento:', error);
      res.status(500).send({ error: 'Erro ao inserir documento' });
    }
  });