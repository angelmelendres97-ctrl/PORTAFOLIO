const authService = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.authenticate({ email, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login
};
