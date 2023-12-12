require('dotenv').config();
const express = require('express');
const expressListEndpoints = require('express-list-endpoints');
const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./src/routes/user.route');

app.use(express.json());

app.use(userRoutes);

const db = require('./config/db.config');

app.get('/welcome', function(req, res) {
  res.send('Bem-Vindo ao Express!');
});

// Exibir as URLs disponíveis
if (process.env.NODE_ENV === 'development') {
  console.log(expressListEndpoints(app));
}

app.listen(port, function() {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});