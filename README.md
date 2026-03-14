# Angel Melendres - Portafolio Profesional

Proyecto monorepo que reúne el frontend (React + Vite) y el backend (Node.js + Express) de un portafolio profesional orientado a mostrar proyectos de software y administrar el contenido desde un panel privado.

## 🚀 Características

- **Frontend**: React + Vite con Tailwind CSS
- **Backend**: Node.js + Express con PostgreSQL
- **Autenticación**: JWT para el panel de administración
- **Modo Oscuro/Claro**: Tema adaptativo
- **Efectos Visuales**: Animación Vanta Globe en el Hero
- **Editor de Texto**: React Quill para descripciones detalladas
- **Gestión de Proyectos**: Imagen de portada y galería
- **Chat/Mensajes**: Sistema de contacto desde el portafolio

## 🗂️ Estructura del Repositorio

```
/
├── backend/           # API REST Express (PostgreSQL)
├── frontend/         # Aplicación React + Vite
├── docker-compose.yml # Orquestación Docker
└── README.md         # Este documento
```

## 🐳 Docker Deployment

### Servicios

| Servicio  | Puerto | Descripción           |
|-----------|--------|----------------------|
| PostgreSQL| 5432   | Base de datos        |
| Backend   | 4000   | API REST             |
| Frontend  | 5173   | Aplicación React     |

### Inicio Rápido

```bash
# Iniciar todos los servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Detener servicios
docker compose down
```

### Comandos Útiles

```bash
# Iniciar en foreground (ver logs)
docker compose up

# Reconstruir imágenes
docker compose build --no-cache

# Ver estado de servicios
docker compose ps

# Acceder a terminal del backend
docker exec -it agxport-backend sh

# Acceder a PostgreSQL
docker exec -it agxport-postgres psql -U postgres -d agxport

# Inicializar base de datos
docker exec -it agxport-backend npm run db:init

# Insertar datos de ejemplo
docker exec -it agxport-backend npm run db:seed
```

## 🛠️ Configuración

### Variables de Entorno

#### PostgreSQL
- `POSTGRES_DB`: agxport
- `POSTGRES_USER`: postgres
- `POSTGRES_PASSWORD`: postgres

#### Backend
- `PORT`: 4000
- `JWT_SECRET`: your-secret-key-change-in-production
- `ADMIN_EMAIL`: admin@example.com
- `ADMIN_PASSWORD`: changeme123
- `PGHOST`: postgres
- `PGPORT`: 5432
- `PGDATABASE`: agxport

#### Frontend
- `VITE_API_URL`: http://localhost:4000/api

## 🌐 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Inicia sesión y devuelve token JWT |
| GET | `/api/projects` | Lista pública de proyectos |
| GET | `/api/projects/:id` | Obtiene un proyecto por ID |
| POST | `/api/projects` | Crea proyecto (requiere token) |
| PUT | `/api/projects/:id` | Actualiza proyecto (requiere token) |
| DELETE | `/api/projects/:id` | Elimina proyecto (requiere token) |
| GET | `/api/config` | Recupera configuración pública |
| PUT | `/api/config` | Actualiza configuración (requiere token) |
| GET | `/api/chat` | Mensajes recibidos (requiere token) |
| POST | `/api/chat` | Envía mensaje desde el sitio público |
| GET | `/api/health` | Verificación de estado del servidor |

## 🗃️ Modelo de Datos (PostgreSQL)

```sql
-- projects
id UUID PRIMARY KEY,
title VARCHAR(255),
summary TEXT,
description TEXT,
detailed_description TEXT,
technologies TEXT[],
repository_url VARCHAR(500),
demo_url VARCHAR(500),
media JSONB,
featured BOOLEAN,
created_at TIMESTAMP,
updated_at TIMESTAMP

-- site_config
id UUID PRIMARY KEY,
hero_title VARCHAR(255),
hero_subtitle TEXT,
about TEXT,
profile_image TEXT,
contact_email VARCHAR(255),
whatsapp_number VARCHAR(50),
github_url VARCHAR(500),
linkedin_url VARCHAR(500),
resume_url VARCHAR(500)

-- chat_messages
id UUID PRIMARY KEY,
name VARCHAR(255),
email VARCHAR(255),
message TEXT,
created_at TIMESTAMP
```

## 📝 Desarrollo Local (sin Docker)

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run db:init
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 🔐 Credenciales de Administrador

- **Email**: admin@example.com
- **Password**: changeme123

---

¡Listo! Con esta base ya puedes iterar sobre nuevas funcionalidades, personalizar estilos y preparar el despliegue de tu portafolio profesional.
