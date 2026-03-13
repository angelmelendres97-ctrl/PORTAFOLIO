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
  postgres: {
    host: required(process.env.PGHOST, 'localhost'),
    port: Number(required(process.env.PGPORT, 5432)),
    database: required(process.env.PGDATABASE, 'agxport'),
    user: required(process.env.PGUSER, 'postgres'),
    password: required(process.env.PGPASSWORD, 'postgres'),
    max: Number(required(process.env.PGMAX, 20)),
    idleTimeoutMillis: Number(required(process.env.PGIDLETIMEOUT, 30000)),
    connectionTimeoutMillis: Number(required(process.env.PGCONNECTIONTIMEOUT, 2000))
  }
};
