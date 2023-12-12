const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Token not provided');
    }

    req.userData = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    let errorMessage = 'Não autorizado';

    if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Token inválido';
    } else if (err.name === 'TokenExpiredError') {
      errorMessage = 'Sessão inválida';
    }

    return res.status(401).json({
      tipoErro: err.name,
      mensagem: errorMessage,
    });
  }
};
