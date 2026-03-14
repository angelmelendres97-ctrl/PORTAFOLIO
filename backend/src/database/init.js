const fs = require('fs');
const path = require('path');
const { pool } = require('./pool');

const schemaPath = path.join(__dirname, 'schema.sql');

async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schema);
    console.log('Database tables created successfully');
    
    const configResult = await client.query('SELECT COUNT(*) FROM site_config');
    if (parseInt(configResult.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO site_config (hero_title, hero_subtitle, about, contact_email)
        VALUES ('Bienvenido a mi Portafolio', 'Desarrollador Full Stack', 'Sobre mí...', 'contacto@ejemplo.com')
      `);
      console.log('Default site config created');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization complete');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Database initialization failed:', err);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
