const { app, con, s3 } = require('../server');
require('dotenv').config();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Usando memória para armazenar temporariamente o arquivo

app.post('/upload/documentos', upload.single('documento'), async (req, res) => {
  let documento;
  
  if (!req.file) {
    return res.status(400).send({ error: 'Nenhum arquivo enviado.' });
  }

  s3.upload({
    Bucket: 'gonzap',
    Key: req.file.originalname, // Usa o nome original do arquivo
    Body: req.file.buffer // O arquivo é acessível no buffer em `req.file`
  },
    async (err, data) => {
      if (err) {
        res.status(500).send({ teste: 'erro', details: err });
      } else {
        documento = data.Location;
        try {
          let [query] = await con.promise().query(
            'INSERT INTO documentos (nome, documento) VALUES (?, ?)',
            [req.body.nome, documento]
          );
          res.send({ id: query.insertId, sucesso: 'Documento adicionado com sucesso!' });
        } catch (dbErr) {
          res.status(500).send({ error: 'Erro ao inserir no banco de dados', details: dbErr });
        }
      }
    }
  );
});







/*
// Rota de Upload
app.post('/api/documentos', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('Nenhum arquivo enviado.');
  }

  // O S3 gerencia o armazenamento e retorna a URL do arquivo
  const fileUrl = req.file.location;
  const fileName = req.file.key; // Nome gerado no S3
  const fileType = req.body.type; // 'audio' ou 'documento'

  // Inserir no banco de dados a URL e informações do arquivo
  const query = 'INSERT INTO arquivos (nome, caminho, tipo) VALUES (?, ?, ?)';
  connectDb.query(query, [fileName, fileUrl, fileType], (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: 'Arquivo enviado com sucesso!', fileId: result.insertId, url: fileUrl });
  });
});*/

/*
// Endpoint para listar documentos
app.get('/gridDocumentos', (req, res) => {
  const sql = 'SELECT id, nome, documento, url FROM documentos'; // Seleciona todos os documentos
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar documentos.' });
    }
    return res.json(results); // Retorna a lista de documentos
  });
});
/*
// Função para excluir um documento do S3
const deleteFromS3 = (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Nome do bucket
    Key: key, // Key do arquivo a ser excluído
  };
  return s3.deleteObject(params).promise(); // Faz a exclusão e retorna uma Promise
};


// Endpoint para excluir documento
app.delete('/api/documentos/:id', (req, res) => {
  const { id } = req.params;
  const sqlSelect = 'SELECT documento FROM documentos WHERE id = ?'; // Seleciona o documento pelo ID
  const sqlDelete = 'DELETE FROM documentos WHERE id = ?'; // Query para excluir o documento

  con.query(sqlSelect, [id], async (err, documento) => {
    if (err || documento.length === 0) {
      return res.status(500).json({ message: 'Erro ao buscar documento no banco de dados.' });
    }

    const key = documento[0].documento; // Obtém a Key do S3 (nome do arquivo no bucket)
    try {
      await deleteFromS3(key); // Exclui o arquivo do S3
      con.query(sqlDelete, [id], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao excluir documento no banco de dados.' });
        }
        return res.json({ message: 'Documento excluído com sucesso.' }); // Resposta de sucesso
      });
    } catch (error) {
      console.error('Erro ao excluir do S3:', error);
      return res.status(500).json({ message: 'Erro ao excluir documento do S3.' });
    }
  });
}); */