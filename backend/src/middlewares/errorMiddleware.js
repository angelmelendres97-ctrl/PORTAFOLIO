const config = require('../config/env');

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  const payload = {
    message
  };

  if (config.nodeEnv !== 'production') {
    payload.stack = err.stack;
  }

  return res.status(status).json(payload);
};

module.exports = errorMiddleware;
