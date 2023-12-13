require('dotenv').config();
const express = require('express');
const app = express();

const db = require('./config/db.config');

const userRoutes = require('./src/routes/user.route');
app.use(express.json());
app.use(userRoutes);

app.get('/', function(req, res) {
  res.send('Bem-Vindo ao Express!');
});

module.exports = app;