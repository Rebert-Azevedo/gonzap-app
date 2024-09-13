import connectDb from '../../../controllers/db/database';

export default async function handler(req, res) {
  const db = await connectDb;

  if (req.method === 'POST') {
    const { nome, mensagem } = req.body;

    try {
      // Query SQL para inserir a nova mensagem
      db.query('INSERT INTO mensagens (nome, mensagem) VALUES (?, ?)', [nome, mensagem], (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Erro ao adicionar mensagem', error: err });
        } else {
          res.status(201).json({ message: 'Mensagem adicionada com sucesso!', data: result });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar mensagem', error });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
