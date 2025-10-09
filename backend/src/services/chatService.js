const { v4: uuid } = require('uuid');
const { hasValidSupabaseConfig, supabaseFetch } = require('../utils/supabaseClient');
const { chatMessages } = require('../models/inMemoryStore');
const config = require('../config/env');

const selectClause = 'id,name,email,message,createdAt';

const getMessages = async () => {
  if (!hasValidSupabaseConfig()) {
    return chatMessages;
  }

  return supabaseFetch(`${config.supabase.chatTable}?order=createdAt.desc&select=${selectClause}`);
};

const addMessage = async ({ name, email, message }) => {
  const newMessage = {
    id: uuid(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  if (!hasValidSupabaseConfig()) {
    chatMessages.unshift(newMessage);
    return newMessage;
  }

  const inserted = await supabaseFetch(config.supabase.chatTable, {
    method: 'POST',
    body: JSON.stringify([newMessage])
  });

  return inserted?.[0] || newMessage;
};

module.exports = {
  getMessages,
  addMessage
};
