const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

const timingSafeEqual = (a, b) => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
};

const authenticate = async ({ email, password }) => {
  const emailMatches = timingSafeEqual(email, config.adminEmail);
  const passwordMatches = timingSafeEqual(password, config.adminPassword);

  if (!emailMatches || !passwordMatches) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      sub: config.adminEmail,
      role: 'admin'
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return {
    token,
    user: {
      email: config.adminEmail,
      role: 'admin'
    }
  };
};

module.exports = {
  authenticate
};
