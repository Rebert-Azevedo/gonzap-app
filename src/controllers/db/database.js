const conect = require('../server');
const express = require('express');
const cors = require('cors');
const app = express();

const multer = require('multer');


// Middleware CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware para interpretar o JSON das requisições
app.use(express.json());

// Iniciar o servidor
app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});


/* Rotas para manipulação de usuário*/

// Rota para incluir um novo usuário
app.post('/api/register', async function (req, res) {
  let [query] = await conect.promise().query(`insert into usuarios (nome,email,telefone,senha) values ('${req.body.nome}','${req.body.email}','${req.body.telefone}','${req.body.senha}' )`)
  res.send(req.body)
})
// Rota para o login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  let [query] = await conect.promise().query(`select * from usuarios where email = '${email}' and senha = '${senha}'`)
  res.send(query)
});
/* Final das rotas para manipulação de usuário*/



/* Rotas para manipulação de mensagens*/

// Rota para mostrar as mensagens no grid
app.get('/gridMensagem', async function (req, res) {
  let [query] = await conect.promise().query(`select * from mensagens`)

  res.send(query);
})

// Rota para mostrar os áudios no grid
app.get('/gridAudios', async function (req, res) {
  let [query] = await conect.promise().query(`select * from audios`)

  res.send(query);
})




// Rota para incluir uma mensagem
app.post('/', async function (req, res) {
  try {
    // Insere a mensagem no banco de dados e captura o resultado
    let [query] = await conect.promise().query(
      `insert into mensagens (nome, mensagem) values (?, ?)`,
      [req.body.nome, req.body.mensagem]  // Usando prepared statements
    );

    // Retorna o corpo da requisição junto com o ID gerado
    res.send({
      id: query.insertId,  // Captura o ID gerado
      nome: req.body.nome,
      mensagem: req.body.mensagem
    });
  } catch (error) {
    console.error('Erro ao inserir mensagem:', error);
    res.status(500).send({ error: 'Erro ao inserir mensagem' });
  }
});



// Rota para editar uma mensagem
app.put('/api/mensagens/:id', async (req, res) => {
  const { id } = req.params; // O ID da mensagem que será editada
  const { nome, mensagem } = req.body; // Os novos valores que serão atualizados

  // Verifica se os campos obrigatórios estão presentes
  if (!nome || !mensagem) {
    return res.status(400).json({ error: 'Nome e mensagem são obrigatórios.' });
  }

  try {
    const [result] = await conect.promise().execute(
      `UPDATE mensagens SET nome = ?, mensagem = ? WHERE id = ?`,
      [nome, mensagem, id]
    );
    // Verifica se a mensagem com o ID fornecido foi encontrada
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mensagem não encontrada.' });
    }
    // Se a mensagem foi atualizada, responde com sucesso
    return res.status(200).json({ message: 'Mensagem atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar a mensagem:', err);
    return res.status(500).json({ error: 'Erro ao atualizar a mensagem.', details: err });
  }
});



// Rota para excluir uma mensagem
app.delete('/api/mensagens/:id', async (req, res) => {
  const { id } = req.params;  // Obtém o ID dos parâmetros da URL

  try {
    // Garante que o ID seja um número
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido!' });
    }

    // Faz a exclusão usando prepared statement
    const [result] = await conect.promise().execute(
      'DELETE FROM mensagens WHERE id = ?',
      [id]
    );

    // Verifica se houve alguma linha afetada (i.e., se o ID existia)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mensagem não encontrada!' });
    }

    // Retorna sucesso se a mensagem foi excluída
    return res.status(200).json({ message: 'Mensagem excluída com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir mensagem:', err);
    return res.status(500).json({ error: 'Erro ao excluir a mensagem', details: err });
  }
});
/* Final das rotas para manipulação de mensagens*/



const storage = multer.memoryStorage(); // Armazena o arquivo em memória (ou pode usar diskStorage para salvar no disco)
const upload = multer({ storage: storage });

// Rota para adicionar áudio
app.post('/api/audios', upload.single('audio'), async function (req, res) { // Altere 'arquivo' para 'audio'
  try {
    const nomeAudio = req.body.nome;
    const arquivoAudio = req.file.buffer; // O arquivo de áudio está no buffer (em memória)

    // Insere o nome e o arquivo de áudio (ou caminho, dependendo do armazenamento) no banco de dados
    let [query] = await conect.promise().query('INSERT INTO audios (nome, audio) VALUES (?, ?)', [
      nomeAudio,
      arquivoAudio
    ]);

    // Retorna o corpo da requisição junto com o ID gerado
    res.send({
      id: query.insertId,  // Captura o ID gerado
      nome: nomeAudio,
      audio: arquivoAudio  // Ou caminho se salvar no disco
    });
  } catch (error) {
    console.error('Erro ao inserir áudio:', error);
    res.status(500).send({ error: 'Erro ao inserir áudio' });
  }
});



// Rota para excluir um audio
app.delete('/api/audios/:id', async (req, res) => {
  const { id } = req.params;  // Obtém o ID dos parâmetros da URL

  try {
    // Garante que o ID seja um número
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido!' });
    }

    // Faz a exclusão usando prepared statement
    const [result] = await conect.promise().execute(
      'DELETE FROM audios WHERE id = ?',
      [id]
    );

    // Verifica se houve alguma linha afetada (i.e., se o ID existia)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Áudio não encontrado!' });
    }

    // Retorna sucesso se a mensagem foi excluída
    return res.status(200).json({ message: 'Áudio excluída com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir mensagem:', err);
    return res.status(500).json({ error: 'Erro ao excluir o áudio', details: err });
  }
});