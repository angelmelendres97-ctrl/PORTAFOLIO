const { v4: uuid } = require('uuid');

const projects = [
  {
    id: 'p-1',
    title: 'Plataforma de Gestión de Tareas',
    summary: 'Aplicación web fullstack para la administración de tareas y seguimiento de equipos.',
    description:
      'Solución construida con React y Node.js que integra notificaciones en tiempo real y paneles personalizados.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    repositoryUrl: 'https://github.com/example/task-manager',
    demoUrl: 'https://tasks.example.com',
    media: {
      image: '/media/projects/task-manager.png'
    },
    featured: true,
    createdAt: new Date('2024-05-10').toISOString(),
    updatedAt: new Date('2024-05-12').toISOString()
  },
  {
    id: 'p-2',
    title: 'API de Notificaciones Inteligentes',
    summary: 'Microservicio escalable para envío de notificaciones multicanal.',
    description:
      'Implementa colas de mensajería y reglas condicionales para priorizar comunicaciones críticas.',
    technologies: ['Node.js', 'Redis', 'RabbitMQ'],
    repositoryUrl: 'https://github.com/example/notifications-api',
    demoUrl: 'https://notify.example.com',
    media: {
      image: '/media/projects/notifications-api.png'
    },
    featured: false,
    createdAt: new Date('2023-11-20').toISOString(),
    updatedAt: new Date('2023-12-01').toISOString()
  }
];

const siteConfig = {
  id: 'config-default',
  heroTitle: '¡Hola! Soy Alex Gómez, Ingeniero de Software',
  heroSubtitle:
    'Desarrollo productos digitales centrados en la experiencia de usuario y la eficiencia operativa.',
  about:
    'Con más de 6 años construyendo soluciones para startups y empresas en crecimiento, combino estrategias de producto, arquitectura backend y desarrollo frontend para impulsar resultados.',
  contactEmail: 'contacto@alexgomez.dev',
  whatsappNumber: '+57 300 000 0000',
  githubUrl: 'https://github.com/alexgomez',
  linkedinUrl: 'https://linkedin.com/in/alexgomez',
  resumeUrl: 'https://alexgomez.dev/cv.pdf'
};

const chatMessages = [];

module.exports = {
  projects,
  siteConfig,
  chatMessages
};
