//Conexão com o banco de dados
const Mysql = require(
    'mysql2' 
)
const connectDb = Mysql.createConnection(
    "mysql://root:MeJppLkysJHzEeEhSNdvuhkHajJAPIJf@autorack.proxy.rlwy.net:14480/railway"
)

connectDb.connect(
    function(err){
        if (err) throw err;
        console.log('Conexão estabelecida')
        
    }
)



//API
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(express.json())

app.listen(8000,() => {
    console.log('servidor express')
})

// Rota para incluir uma mensagem
app.post('/', async function(request,response){
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
  