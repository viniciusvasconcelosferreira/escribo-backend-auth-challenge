const express = require('express');
const router = express.Router();

const userValidation = require('../middleware/authvalidation.middleware');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

//Register route with register validation
router.post('/register', userValidation.validaRegistraUsuario, userController.registra);
router.post('/login', userValidation.validaLoginUsuario, userController.login);
router.get('/user/:id', verifyToken, userController.busca);

module.exports = router;