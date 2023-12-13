const app = require('./app'); // Importa seu aplicativo Express
const expressListEndpoints = require('express-list-endpoints');
const port = process.env.PORT || 3000;

// Exibir as URLs disponíveis
if (process.env.NODE_ENV === 'development') {
  console.log(expressListEndpoints(app));
}

app.listen(port, function() {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
