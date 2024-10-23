// Criar Servidor
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

require('dotenv').config(); 

const app = express();
app.use(express.json(), cors({ origin: '*' }));

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});

// Conexão com o banco de dados
const Mysql = require('mysql2');
const connectDb = Mysql.createConnection(process.env.CONNECTION_DB);


connectDb.connect( function (err) {
    if (err) throw err;
    console.log('Conectado com sucesso. Servidor RAILWAY')
});

// Configurar o AWS SDK com suas credenciais e a região correta
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Configurar o Multer para armazenar os arquivos diretamente no S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,  // Nome do bucket no S3
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname); // Nome do arquivo no S3
        }
    })
});

// Exporta Conexões
module.exports = {
    app: app,
    con: connectDb,
    upload: upload,
    s3: s3
}
