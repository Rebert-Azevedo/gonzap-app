// Importações e Configurações
const conect = require('../server');
const express = require('express');
const cors = require('cors');
const app = express();

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
app.post('/api/register', async function (req, res){
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

// Rota para incluir uma mensagem
app.post('/', async function (req, res) {
  let [query] = await conect.promise().query(`insert into mensagens (nome,mensagem) values ('${req.body.nome}','${req.body.mensagem}' )`)
  res.send(req.body)
})


// Rota para editar uma mensagem
app.put('/api/mensagens/:id', async (req, res) => {
  const { id } = req.params; // O ID da mensagem que será editada
  const { nome, mensagem } = req.body; // Os novos valores que serão atualizados

  // Verifica se os campos obrigatórios estão presentes
  if (!nome || !mensagem) {
    return res.status(400).json({ error: 'Nome e mensagem são obrigatórios.' });
  }

  const sql = `UPDATE mensagens SET nome = ${nome}, mensagem = ${mensagem} WHERE id = ${id}`;

  try {
    // Usa conect.promise().execute() para lidar com a query e parâmetros
    const [result] = await conect.promise().execute(sql);
    // Verifica se a mensagem com o ID fornecido foi encontrada
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mensagem não encontrada.' });
    }
    // Se a mensagem foi atualizada, responde com sucesso
    return res.status(200).json({ message: 'Mensagem atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar a mensagem:', err);
    // Retorna um erro genérico de servidor caso algo dê errado
    return res.status(500).json({ error: 'Erro ao atualizar a mensagem.', details: err });
  }
});


// Rota para excluir uma mensagem
app.delete('/api/mensagens/:id', async (request, response) => {
  const { id } = request.params;  // Obtém o ID dos parâmetros da URL
  const sql = 'DELETE FROM mensagens WHERE id = ?';

  try {
    const [result] = await db.promise().execute(sql, [id]);

    // Verifica se houve alguma linha afetada (i.e., se o ID existia)
    if (result.affectedRows === 0) {
      return response.status(404).json({ message: 'Mensagem não encontrada!' });
    }

    // Retorna sucesso se a mensagem foi excluída
    return response.status(200).json({ message: 'Mensagem excluída com sucesso!' });
  } catch (err) {
    // Captura e retorna qualquer erro ocorrido durante o processo
    return response.status(500).json({ error: 'Erro ao excluir a mensagem', details: err });
  }
});
/* Final das rotas para manipulação de mensagens*/

