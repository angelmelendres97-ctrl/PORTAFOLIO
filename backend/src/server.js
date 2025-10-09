const app = require('./app');
const config = require('./config/env');

const server = app.listen(config.port, () => {
  console.log(`API escuchando en http://localhost:${config.port}`);
});

const shutdown = () => {
  console.log('Cerrando servidor...');
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
