const { app, con } = require('../server');

// Rota para exibir os funis no grid
app.get('/gridFunis', async function (req, res) {
    try {
        let [query] = await con.promise().query('SELECT * FROM funis');
        res.json(query);
    } catch (error) {
        console.error('Erro ao buscar funis:', error);
        res.status(500).send({ error: 'Erro ao buscar funis' });
    }
});








// Rota para excluir um documento
app.delete('/api/funis/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido!' });
        }

        const [result] = await con.promise().execute('DELETE FROM funis WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Funil não encontrado!' });
        }

        return res.status(200).json({ message: 'Funil excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao excluir funil:', err);
        return res.status(500).json({ error: 'Erro ao excluir funil', details: err });
    }
});