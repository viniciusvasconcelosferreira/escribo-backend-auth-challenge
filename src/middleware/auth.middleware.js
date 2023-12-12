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
    let errorMessage = 'Unauthorized';

    if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token expired';
    }

    return res.status(401).json({
      mensagem: errorMessage,
      tipoErro: err.name,
    });
  }
};
