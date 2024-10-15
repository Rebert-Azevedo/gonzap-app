const { app, con } = require('../server');
const SHA256 = require('crypto-js/sha256');
const { body, validationResult } = require('express-validator');

app.post('/api/register',
    [
        body('nome').notEmpty().withMessage('O nome é obrigatório'),
        body('email').isEmail().withMessage('Email inválido'),
        body('telefone').isLength({ min: 10 }).withMessage('Telefone deve ter pelo menos 10 dígitos'),
        body('senha').isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
    ],
    async function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nome, email, telefone, senha } = req.body;

        try {
            const hashedPassword = SHA256(senha).toString();

            const query = `INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)`;
            const values = [nome, email, telefone, hashedPassword];

            await con.promise().query(query, values);

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde.' });
        }
    }
);
