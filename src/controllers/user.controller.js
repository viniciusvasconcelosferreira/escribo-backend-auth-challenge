const asyncHandler = require('express-async-handler');
const userService = require('../services/user.service');

const registra = asyncHandler(async (req, res) => {
  const { nome, email, senha, telefones } = req.body;

  try {
    const { usuario, token } = await userService.registraUsuario({ nome, email, senha, telefones });

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      resultado: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        telefones: usuario.telefones,
        data_criacao: usuario.data_criacao,
        data_atualizacao: usuario.data_atualizacao,
        ultimo_login: usuario.ultimo_login,
        token: token,
      },
      sucesso: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, senha } = req.body;

  try {
    const respostaUsuario = await userService.autenticaUsuario({ email, senha });

    return res.status(200).json(respostaUsuario);
  } catch (error) {
    return res.status(401).json({
      mensagem: error.message,
      sucesso: false,
    });
  }
});

const busca = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const respostaUsuario = await userService.buscaUsuario(id);

    return res.status(200).json(respostaUsuario);
  } catch (error) {
    return res.status(403).json({
      mensagem: error.message,
      sucesso: false,
    });
  }
});

module.exports = {
  registra,
  login,
  busca,
};