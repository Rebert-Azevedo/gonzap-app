//API
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
  let [query] = await connectDb.promise().query(`insert into mensagens (nome,mensagem) values ('${request.body.nome}','${request.body.mensagem}' )`)
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
