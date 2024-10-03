// Criar Servidor
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json( ), cors({ origin: '*' }));

app.listen(8000, ( ) => {
    console.log('Servidor rodando na porta 8000');
});

// Conexão com o banco de dados
const Mysql = require('mysql2');
const connectDb = Mysql.createConnection("mysql://root:MeJppLkysJHzEeEhSNdvuhkHajJAPIJf@autorack.proxy.rlwy.net:14480/railway");

connectDb.connect( function (err) {
    if (err) throw err;
    console.log('Conectado com sucesso. Servidor RAILWAY')
});

// Multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Exporta Conexões
module.exports = {
    app: app,
    con: connectDb,
    upload: upload
}