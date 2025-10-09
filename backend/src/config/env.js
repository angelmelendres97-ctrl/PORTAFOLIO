const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const required = (value, fallback) => (value === undefined || value === '' ? fallback : value);

module.exports = {
  nodeEnv: required(process.env.NODE_ENV, 'development'),
  port: Number(required(process.env.PORT, 4000)),
  jwtSecret: required(process.env.JWT_SECRET, 'development-secret'),
  jwtExpiresIn: required(process.env.JWT_EXPIRES_IN, '2h'),
  adminEmail: required(process.env.ADMIN_EMAIL, 'admin@example.com'),
  adminPassword: required(process.env.ADMIN_PASSWORD, 'changeme123'),
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    projectTable: required(process.env.SUPABASE_PROJECTS_TABLE, 'projects'),
    configTable: required(process.env.SUPABASE_CONFIG_TABLE, 'site_config'),
    chatTable: required(process.env.SUPABASE_CHAT_TABLE, 'chat_messages')
  }
};
