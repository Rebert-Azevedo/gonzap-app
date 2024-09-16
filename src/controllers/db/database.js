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



// Rota para editar uma mensagem
app.put('/api/mensagens/:id', async (request, response) => {
  const { id } = request.params; // O ID da mensagem que será editada
  const { nome, mensagem } = request.body; // Os novos valores que serão atualizados

  // Verifica se os campos obrigatórios estão presentes
  if (!nome || !mensagem) {
    return response.status(400).json({ error: 'Nome e mensagem são obrigatórios.' });
  }

  const sql = `UPDATE mensagens SET nome = ${nome}, mensagem = ${mensagem} WHERE id = ${id}`;

  try {
    // Usa conect.promise().execute() para lidar com a query e parâmetros
    const [result] = await conect.promise().execute(sql);

    // Verifica se a mensagem com o ID fornecido foi encontrada
    if (result.affectedRows === 0) {
      return response.status(404).json({ error: 'Mensagem não encontrada.' });
    }

    // Se a mensagem foi atualizada, responde com sucesso
    return response.status(200).json({ message: 'Mensagem atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar a mensagem:', err);
    // Retorna um erro genérico de servidor caso algo dê errado
    return response.status(500).json({ error: 'Erro ao atualizar a mensagem.', details: err });
  }
});

