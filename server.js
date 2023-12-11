require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', function (req, res) {
    res.send('Bem-Vindo ao Express !');
});

app.listen(port, function () {
    console.log(`Servidor escutando na porta ${port}`);
});