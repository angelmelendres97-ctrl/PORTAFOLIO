const app = require('./app');
const config = require('./config/env');
const { pool } = require('./database/pool');

async function startServer() {
  try {
    await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL database');

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
