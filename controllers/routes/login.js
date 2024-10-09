const { app, con } = require('../server');

// Rota para o login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    let [query] = await con.promise().query(`select * from usuarios where email = '${email}' and senha = '${senha}'`)
    res.send(query)
});
