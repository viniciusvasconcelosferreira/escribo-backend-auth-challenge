const Validator = require('validatorjs');

const validaRegistraUsuario = (req, res, next) => {
  const rules = {
    'nome': 'required|string|min:3',
    'email': 'required|email',
    'senha': 'required|min:6',
    'telefones': 'required|array',
    'telefones.*.ddd': 'required|numeric|digits:2',
    'telefones.*.numero': 'required|numeric|max:9',
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    res.status(412).json({
      sucesso: false,
      mensagem: 'Validation failed',
      data: validation.errors.all(),
    });
  } else {
    next();
  }
};

const validaLoginUsuario = (req, res, next) => {
  const rules = {
    'email': 'required|email',
    'senha': 'required|min:6',
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    res.status(412).json({
      sucesso: false,
      mensagem: 'Validation failed',
      data: validation.errors.all(),
    });
  } else {
    next();
  }
};

module.exports = {
  validaRegistraUsuario,
  validaLoginUsuario,
};