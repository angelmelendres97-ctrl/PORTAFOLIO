const { validationResult } = require('express-validator');
const chatService = require('../services/chatService');

const listMessages = async (req, res, next) => {
  try {
    const messages = await chatService.getMessages();
    return res.json(messages);
  } catch (error) {
    return next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = await chatService.addMessage(req.body);
    return res.status(201).json(message);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listMessages,
  createMessage
};
