require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

const userRoutes = require('./src/routes/user.route');

app.use(express.json());

app.use('/users', userRoutes);

const db = require('./config/db.config');

app.get('/', function(req, res) {
  res.send('Bem-Vindo ao Express!');
});

app.listen(port, function() {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});