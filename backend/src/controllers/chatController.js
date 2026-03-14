const chatService = require('../services/chatService');

const getMessages = async (req, res, next) => {
  try {
    const messages = await chatService.getMessages();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

const addMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email y message son requeridos' });
    }

    const newMessage = await chatService.addMessage({ name, email, message });
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
  addMessage
};
