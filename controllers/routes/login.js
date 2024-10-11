const { app, con } = require('../server');
const SHA256 = require('crypto-js/sha256');

app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const hashedPassword = SHA256(senha).toString();

    try {
        const [rows] = await con.promise().query(
            'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
            [email, hashedPassword]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        res.status(500).json({ error: 'Erro ao tentar realizar o login. Tente novamente mais tarde.' });
    }
});
