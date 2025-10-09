const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const credentials = req.body;
    const result = await authService.authenticate(credentials);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login
};
