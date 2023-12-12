const mongoose = require('mongoose');

const dbConfig = {
  url: process.env.NODE_ENV !== 'development' ? process.env.MONGO_REMOTE_URL : process.env.MONGO_LOCAL_URL,
};

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB.');
});

module.exports = db;