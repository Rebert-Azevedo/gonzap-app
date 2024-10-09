const { app, con } = require('../server');

// Rota para incluir um novo usuário
app.post('/api/register', async function (req, res) {
    let [query] = await con.promise().query(`insert into usuarios (nome,email,telefone,senha) values ('${req.body.nome}','${req.body.email}','${req.body.telefone}','${req.body.senha}' )`)
    res.send(req.body)
})