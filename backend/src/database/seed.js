const fs = require('fs');
const path = require('path');
const { pool } = require('./pool');

const seedData = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO projects (id, title, summary, description, technologies, repository_url, demo_url, media, featured, created_at, updated_at)
      VALUES 
        ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Portafolio Personal', 'Aplicación web de portafolio profesional', 'Desarrollo de un portafolio personal completo con panel de administración, autenticación JWT y base de datos PostgreSQL. Incluye gestión de proyectos, configuración del sitio y sistema de mensajería.', ARRAY['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'], 'https://github.com/angelmelendres/portafolio', 'https://miportafolio.com', '{"image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"}', true, NOW(), NOW()),
        ('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'E-commerce App', 'Tienda en línea moderna', 'Aplicación de comercio electrónico con carrito de compras, pasarela de pago, gestión de inventarios y panel de administración. Diseño responsivo y experiencia de usuario optimizada.', ARRAY['React', 'Express', 'MongoDB', 'Stripe'], 'https://github.com/angelmelendres/ecommerce', 'https://mitienda.com', '{"image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"}', true, NOW(), NOW()),
        ('c3d4e5f6-a7b8-9012-cdef-345678901234', 'Dashboard Admin', 'Panel de administración empresarial', 'Dashboard administrativo con gráficos, tablas de datos, gestión de usuarios y reportes. Interfaz moderna y fluida con animaciones.', ARRAY['Vue.js', 'Chart.js', 'Firebase'], 'https://github.com/angelmelendres/dashboard', 'https://dashboard-demo.com', '{"image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"}', false, NOW(), NOW()),
        ('d4e5f6a7-b8c9-0123-def0-567890123456', 'Blog Platform', 'Plataforma de blogging', 'Sistema de blogging con autenticación, creación y edición de posts, comentarios y sistema de likes. Optimizado para SEO.', ARRAY['Next.js', 'Prisma', 'PostgreSQL'], 'https://github.com/angelmelendres/blog', 'https://miblog.com', '{"image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"}', false, NOW(), NOW()),
        ('e5f6a7b8-c9d0-1234-ef01-567890123467', 'Chat App', 'Aplicación de mensajería en tiempo real', 'Aplicación de mensajería con salas privadas, soporte para archivos, emojis y notificaciones en tiempo real.', ARRAY['Socket.io', 'React', 'Node.js'], 'https://github.com/angelmelendres/chatapp', 'https://chatapp-demo.com', '{"image": "https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=800"}', false, NOW(), NOW())
    `);

    await client.query(`
      UPDATE site_config SET 
        hero_title = 'Hola, soy Desarrollador Full Stack',
        hero_subtitle = 'Creo soluciones digitales modernas y escalables',
        about = 'Soy un desarrollador passionate con experiencia en la creación de aplicaciones web y móviles. Me especializo en JavaScript/TypeScript, React, Node.js y bases de datos PostgreSQL. Siempre estoy aprendiendo nuevas tecnologías y mejorando mis habilidades.',
        contact_email = 'contacto@ejemplo.com',
        whatsapp_number = '+593987654321',
        github_url = 'https://github.com/angelmelendres',
        linkedin_url = 'https://linkedin.com/in/angelmelendres',
        resume_url = 'https://drive.google.com/file/d/ejemplo',
        updated_at = NOW()
      WHERE id = (SELECT id FROM site_config LIMIT 1)
    `);

    await client.query(`
      INSERT INTO chat_messages (id, name, email, message, created_at)
      VALUES 
        ('f1a2b3c4-d5e6-7890-abcd-1234567890ab', 'Juan Pérez', 'juan@email.com', 'Hola, me interesa tu trabajo. ¿Tienes disponibilidad para un proyecto?', NOW() - INTERVAL '2 days'),
        ('a2b3c4d5-e6f7-8901-bcde-2345678901bc', 'María García', 'maria@empresa.com', 'Excelente portafolio. Quería preguntarte sobre el proyecto de e-commerce.', NOW() - INTERVAL '1 day')
    `);

    await client.query('COMMIT');
    console.log('Seed data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting seed data:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

if (require.main === module) {
  seedData()
    .then(() => {
      console.log('Seed completed');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seed failed:', err);
      process.exit(1);
    });
}

module.exports = { seedData };
