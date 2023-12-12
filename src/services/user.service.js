const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const registraUsuario = async ({ nome, email, senha, telefones = [] }) => {
  const usuarioExistente = await userModel.findOne({ email: email });

  if (usuarioExistente) {
    const erro = new Error('E-mail já existente');
    erro.statusCode = 403;
    throw erro;
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const telefonesMapeados = telefones.map(({ ddd, numero }) => ({ ddd, numero }));

  const usuario = new userModel({
    nome: nome,
    email: email,
    senha: senhaCriptografada,
    telefones: telefonesMapeados,
  });

  const usuarioSalvo = await usuario.save();

  // Gera o token
  const jwtToken = jwt.sign(
    {
      id: usuarioSalvo.id,
      email: usuarioSalvo.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1800s' },
  );

  // Retorna o usuário salvo e o token
  return {
    usuario: usuarioSalvo,
    token: jwtToken,
  };
};

const autenticaUsuario = async ({ email, senha }) => {
  const usuarioExistente = await userModel.findOne({ email: email });

  if (!usuarioExistente) {
    const erro = new Error('Usuário e/ou senha inválidos');
    erro.statusCode = 401;
    throw erro;
  }

  const senhaValida = await bcrypt.compare(senha, usuarioExistente.senha);

  if (!senhaValida) {
    const erro = new Error('Usuário e/ou senha inválidos');
    erro.statusCode = 401;
    throw erro;
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
  const usuarioExistente = await userModel.findOne({ id: id }).lean();

  if (!usuarioExistente) {
    const erro = new Error('Usuário não encontrado');
    erro.statusCode = 404;
    throw erro;
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

  const telefonesSemId = usuarioExistente.telefones.map(({ _id, ...telefone }) => telefone);

  return {
    id: usuarioExistente.id,
    nome: usuarioExistente.nome,
    email: usuarioExistente.email,
    telefones: telefonesSemId,
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
