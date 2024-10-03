const { app, con } = require('./server');

require('./routes/audios');
require('./routes/documentos');
require('./routes/mensagens');

// Rota para incluir um novo usuário
app.post('/api/register', async function (req, res) {
    let [query] = await con.promise().query(`insert into usuarios (nome,email,telefone,senha) values ('${req.body.nome}','${req.body.email}','${req.body.telefone}','${req.body.senha}' )`)
    res.send(req.body)
  })

// Rota para o login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    let [query] = await con.promise().query(`select * from usuarios where email = '${email}' and senha = '${senha}'`)
    res.send(query)
});
  