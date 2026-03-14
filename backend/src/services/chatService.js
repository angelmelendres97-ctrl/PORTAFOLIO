const { v4: uuid } = require('uuid');
const { query } = require('../database/pool');

const normalizeMessage = (message) => ({
  id: message.id,
  name: message.name,
  email: message.email,
  message: message.message,
  createdAt: message.created_at
});

const getMessages = async () => {
  const result = await query(
    'SELECT id, name, email, message, created_at FROM chat_messages ORDER BY created_at DESC'
  );
  return result.rows.map(normalizeMessage);
};

const addMessage = async ({ name, email, message }) => {
  const newMessage = {
    id: uuid(),
    name,
    email,
    message,
    createdAt: new Date()
  };

  const result = await query(
    `INSERT INTO chat_messages (id, name, email, message, created_at)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, message, created_at`,
    [newMessage.id, newMessage.name, newMessage.email, newMessage.message, newMessage.createdAt]
  );

  return normalizeMessage(result.rows[0]);
};

module.exports = {
  getMessages,
  addMessage
};
