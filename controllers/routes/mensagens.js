const { app, con } = require('../server');

// Rota para mostrar as mensagens no grid
app.get('/gridMensagem', async function (req, res) {
  let [query] = await con.promise().query(`select * from mensagens`)

  res.send(query);
});

// Rota para incluir uma mensagem
app.post('/', async function (req, res) {
  try {
    // Insere a mensagem no banco de dados e captura o resultado
    let [query] = await con.promise().query(
      `insert into mensagens (nome, mensagem) values (?, ?)`,
      [req.body.nome, req.body.mensagem]  // Usando prepared statements
    );

    // Retorna o corpo da requisição junto com o ID gerado
    res.send({
      id: query.insertId,  // Captura o ID gerado
      nome: req.body.nome,
      mensagem: req.body.mensagem
    });
  } catch (error) {
    console.error('Erro ao inserir mensagem:', error);
    res.status(500).send({ error: 'Erro ao inserir mensagem' });
  }
});


// Rota para editar uma mensagem
app.put('/api/mensagens/:id', async (req, res) => {
  const { id } = req.params; // O ID da mensagem que será editada
  const { nome, mensagem } = req.body; // Os novos valores que serão atualizados

  // Verifica se os campos obrigatórios estão presentes
  if (!nome || !mensagem) {
    return res.status(400).json({ error: 'Nome e mensagem são obrigatórios.' });
  }

  try {
    const [result] = await con.promise().execute(
      `UPDATE mensagens SET nome = ?, mensagem = ? WHERE id = ?`,
      [nome, mensagem, id]
    );
    // Verifica se a mensagem com o ID fornecido foi encontrada
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mensagem não encontrada.' });
    }
    // Se a mensagem foi atualizada, responde com sucesso
    return res.status(200).json({ message: 'Mensagem atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar a mensagem:', err);
    return res.status(500).json({ error: 'Erro ao atualizar a mensagem.', details: err });
  }
});


// Rota para excluir uma mensagem
app.delete('/api/mensagens/:id', async (req, res) => {
  const { id } = req.params;  // Obtém o ID dos parâmetros da URL

  try {
    // Garante que o ID seja um número
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido!' });
    }

    // Faz a exclusão usando prepared statement
    const [result] = await con.promise().execute(
      'DELETE FROM mensagens WHERE id = ?',
      [id]
    );

    // Verifica se houve alguma linha afetada (i.e., se o ID existia)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mensagem não encontrada!' });
    }

    // Retorna sucesso se a mensagem foi excluída
    return res.status(200).json({ message: 'Mensagem excluída com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir mensagem:', err);
    return res.status(500).json({ error: 'Erro ao excluir a mensagem', details: err });
  }
});