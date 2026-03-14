const configService = require('../services/configService');

const getConfig = async (req, res, next) => {
  try {
    const config = await configService.getConfig();
    res.json(config);
  } catch (error) {
    next(error);
  }
};

const updateConfig = async (req, res, next) => {
  try {
    const config = await configService.updateConfig(req.body);
    res.json(config);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConfig,
  updateConfig
};
