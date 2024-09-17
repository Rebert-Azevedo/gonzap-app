//Conexão com o banco de dados
const Mysql = require(
    'mysql2'
)
const connectDb = Mysql.createConnection(
    "mysql://root:MeJppLkysJHzEeEhSNdvuhkHajJAPIJf@autorack.proxy.rlwy.net:14480/railway"
)

connectDb.connect(
    function (err) {
        if (err) throw err;
        console.log('Conectado com sucesso. Servidor RAILWAY')
    }
)

module.exports = connectDb