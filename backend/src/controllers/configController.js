const { validationResult } = require('express-validator');
const configService = require('../services/configService');

const getSiteConfig = async (req, res, next) => {
  try {
    const config = await configService.getConfig();
    return res.json(config);
  } catch (error) {
    return next(error);
  }
};

const updateSiteConfig = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const config = await configService.updateConfig(req.body);
    return res.json(config);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getSiteConfig,
  updateSiteConfig
};
