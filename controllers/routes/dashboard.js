const { app, con } = require('../server');

app.get('/api/gridMensagens', async function (req, res) {
    let [query] = await con.promise().query(`call qtItens ();`);
    console.log(query)
    try {
        res.send({ count: query[0].count }); // Sempre retornar a contagem
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
        
    }
});

// Repita para as outras rotas
app.get('/api/gridAudios', async function (req, res) {
    try {
        let [query] = await con.promise().query(`SELECT COUNT(*) as count FROM audios`);
        res.send({ count: query[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Continue com as outras rotas...



/*const { app, con } = require('../server');

app.get('/api/gridMensagens', async function (req, res) {
    try {
        let [query] = await con.promise().query(`SELECT COUNT(*) as count FROM mensagens`);
        if (query[0].count === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        res.send({ count: query[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.get('/api/gridAudios', async function (req, res) {
    try {
        let [query] = await con.promise().query(`SELECT COUNT(*) as count FROM audios`);
        if (query[0].count === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        res.send({ count: query[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.get('/api/gridDocumentos', async function (req, res) {
    try {
        let [query] = await con.promise().query(`SELECT COUNT(*) as count FROM documentos`);
        if (query[0].count === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        res.send({ count: query[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.get('/api/gridFunis', async function (req, res) {
    try {
        let [query] = await con.promise().query(`SELECT COUNT(*) as count FROM funis`);
        if (query[0].count === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        res.send({ count: query[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.get('/api/gridGatilhos', async function (req, res) {
    try {
        let [query] = await con.promise().query(`SELECT COUNT(*) as count FROM gatilhos`);
        if (query[0].count === 0) {
            return res.status(404).send({ message: 'No data found' });
        }
        res.send({ count: query[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
*/