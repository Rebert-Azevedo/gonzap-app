const { app, con } = require('../server');

app.get('/api/gridDashboard', async function (req, res) {
    try {
        let [query] = await con.promise().query(`call dashboard`);
        res.send(query);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

/*Para adicionar FUNIS e GATILHOS no contador do dashboard, mudar na procedure "dashboard" */