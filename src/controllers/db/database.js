//API
const conect = require('../server');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json())

app.listen(8000, () => {
  console.log('servidor express(Railway)')
})

// Rota para incluir uma mensagem
app.post('/', async function (request, response) {
  let [query] = await conect.promise().query(`insert into mensagens (nome,mensagem) values ('${request.body.nome}','${request.body.mensagem}' )`)
  response.send(request.body)
})

// Rota para excluir uma mensagem
app.delete('/api/mensagens/:id', (request, response) => {
  const { id } = request.params;
  const sql = 'DELETE FROM mensagens WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return response.status(500).json({ error: err });
    }
    response.status(200).json({ message: 'Mensagem excluída com sucesso!' });
  });
});

// Rota para editar uma mensagem
app.put('/api/mensagens/:id', async (request, response) => {
  const { id } = request.params; // O ID da mensagem que será editada
  const { nome, mensagem } = request.body; // Os novos valores que serão atualizados

  if (!nome || !mensagem) {
    return response.status(400).json({ error: 'Nome e mensagem são obrigatórios.' });
  }

  const sql = 'UPDATE mensagens SET nome = ?, mensagem = ? WHERE id = ?';

  try {
    const [result] = await conect.promise().query(sql, [nome, mensagem, id]);

    if (result.affectedRows === 0) {
      return response.status(404).json({ error: 'Mensagem não encontrada.' });
    }

    response.status(200).json({ message: 'Mensagem atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar a mensagem:', err);
    return response.status(500).json({ error: 'Erro ao atualizar a mensagem.' });
  }
});
