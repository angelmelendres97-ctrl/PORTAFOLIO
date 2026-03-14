# Angel Melendres - Backend

API REST construida con Node.js + Express para el portafolio profesional.

## Características

- Autenticación JWT para el panel administrativo
- Base de datos PostgreSQL
- Endpoints RESTful para proyectos, configuración y mensajes
- Validación de datos con express-validator
- Manejo de errores centralizado
- Soporte para imágenes en Base64

## Requisitos

- Node.js 18+
- PostgreSQL 16+

## Instalación

```bash
npm install
npm run db:init
npm run dev
```

El servidor se ejecutará en `http://localhost:4000`.

## Variables de Entorno

```env
NODE_ENV=development
PORT=4000

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=2h

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123

PGHOST=localhost
PGPORT=5432
PGDATABASE=agxport
PGUSER=postgres
PGPASSWORD=postgres
```

## Scripts

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run db:init`: Inicializa las tablas de la base de datos
- `npm run db:seed`: Inserta datos de ejemplo

## Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Inicia sesión y devuelve token JWT |

### Proyectos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/projects` | Lista todos los proyectos |
| GET | `/api/projects/:id` | Obtiene un proyecto por ID |
| POST | `/api/projects` | Crea un nuevo proyecto (requiere auth) |
| PUT | `/api/projects/:id` | Actualiza un proyecto (requiere auth) |
| DELETE | `/api/projects/:id` | Elimina un proyecto (requiere auth) |

### Configuración
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/config` | Obtiene la configuración del sitio |
| PUT | `/api/config` | Actualiza la configuración (requiere auth) |

### Chat/Mensajes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/chat` | Lista todos los mensajes (requiere auth) |
| POST | `/api/chat` | Envía un nuevo mensaje |

### Sistema
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Verificación de estado del servidor |

## Estructura

```
src/
├── config/         # Configuración (env.js)
├── database/       # Conexión y esquemas de BD
├── controllers/    # Controladores
├── routes/         # Rutas API
├── services/       # Lógica de negocio
├── middlewares/    # Middlewares (auth, error)
└── app.js         # Configuración de Express
```

## Tecnologías

- Node.js
- Express
- PostgreSQL (pg)
- JWT (jsonwebtoken)
- Express Validator
- Helmet
- Morgan
- CORS
- UUID

---

Para más información, consulta el README principal del proyecto.
