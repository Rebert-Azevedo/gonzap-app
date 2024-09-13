const Mensagem = require('../models/mensagemModel');

const adicionarMensagem = async (req, res) => {
  try {
    const novaMensagem = new Mensagem(req.body);
    const mensagemSalva = await novaMensagem.save();
    res.status(201).json({ id: mensagemSalva._id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar a mensagem' });
  }
};

const excluirMensagem = async (req, res) => {
  try {
    const mensagemExcluida = await Mensagem.findByIdAndDelete(req.params.id);
    if (!mensagemExcluida) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    res.status(200).json({ message: 'Mensagem excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir a mensagem' });
  }
};

module.exports = { adicionarMensagem, excluirMensagem };
