const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nome: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: [
    {
      ddd: {
        type: Number,
        required: true,
      },
      numero: {
        type: Number,
        required: true,
      },
    },
  ],
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
