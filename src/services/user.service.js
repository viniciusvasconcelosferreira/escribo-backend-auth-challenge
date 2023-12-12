const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const registraUsuario = async ({ nome, email, senha, telefones = [] }) => {
  const usuarioExistente = await userModel.findOne({ email: email });

  if (usuarioExistente) {
    throw new Error('E-mail já utilizado');
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const telefonesMapeados = telefones.map(({ ddd, numero }) => ({ ddd, numero }));

  const usuario = new userModel({
    nome: nome,
    email: email,
    senha: senhaCriptografada,
    telefones: telefonesMapeados,
  });

  return usuario.save();
};

const autenticaUsuario = async ({ email, senha }) => {
  const usuarioExistente = await userModel.findOne({ email: email });

  if (!usuarioExistente) {
    throw new Error('Falha na autenticação');
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);

  if (!senhaValida) {
    throw new Error('Falha na autenticação');
  }

  const jwtToken = jwt.sign(
    {
      email: usuarioExistente.email,
      id: usuarioExistente.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1800s',
    },
  );

  return {
    id: usuarioExistente.id,
    data_criacao: usuarioExistente.data_criacao,
    data_atualizacao: usuarioExistente.data_atualizacao,
    ultimo_login: usuarioExistente.ultimo_login,
    token: jwtToken,
  };
};

const buscaUsuario = async (id) => {
  const usuarioExistente = await userModel.findOne({ id: id });

  if (!usuarioExistente) {
    throw new Error('Usuário não encontrado');
  }

  return {
    id: usuarioExistente.id,
    nome: usuarioExistente.nome,
    email: usuarioExistente.email,
    telefones: usuarioExistente.telefones,
    data_criacao: usuarioExistente.data_criacao,
    data_atualizacao: usuarioExistente.data_atualizacao,
    ultimo_login: usuarioExistente.ultimo_login,
    token: jwtToken,
  };
};

module.exports = {
  registraUsuario,
  autenticaUsuario,
  buscaUsuario,
};
