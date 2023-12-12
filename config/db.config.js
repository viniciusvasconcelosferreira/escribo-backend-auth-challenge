const mongoose = require('mongoose');

const dbConfig = {
  url: process.env.MONGO_REMOTE_URL || 'mongodb://localhost:27017/nome-do-banco',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

mongoose.connect(dbConfig.url, dbConfig.options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB.');
});

module.exports = db;