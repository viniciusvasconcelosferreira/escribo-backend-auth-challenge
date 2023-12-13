const mongoose = require('mongoose');

const dbConfig = {
  development: process.env.MONGO_LOCAL_URL,
  test: process.env.MONGO_LOCAL_TEST_URL,
  production: process.env.MONGO_REMOTE_URL,
};

const environment = process.env.NODE_ENV || 'development';

mongoose.connect(dbConfig[environment]);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB.');
});

module.exports = db;
