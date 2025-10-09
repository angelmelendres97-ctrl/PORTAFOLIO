# AGX Portfolio Backend

API REST construida con Express para gestionar la información del portafolio personal y proveer endpoints seguros para el panel administrativo.

## Características principales

- **Autenticación JWT** basada en credenciales definidas en variables de entorno.
- **Gestión de proyectos** con CRUD completo y validaciones.
- **Gestión de configuración del sitio** (hero, contacto y enlaces sociales).
- **Chat de contacto** con almacenamiento en Supabase o memoria según la configuración disponible.
- **Integración opcional con Supabase** mediante la API REST nativa.
- **Arquitectura modular** separando rutas, controladores, servicios y middlewares.

## Requisitos previos

- Node.js 18+
- Cuenta y proyecto en [Supabase](https://supabase.com/) (opcional para esta fase).

## Variables de entorno

Crea un archivo `.env` a partir de `.env.example` con tus valores personalizados:

```env
PORT=4000
NODE_ENV=development
JWT_SECRET=super-secret-change-me
JWT_EXPIRES_IN=2h
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
SUPABASE_PROJECTS_TABLE=projects
SUPABASE_CONFIG_TABLE=site_config
SUPABASE_CHAT_TABLE=chat_messages
```

> **Nota:** En producción se recomienda almacenar `ADMIN_PASSWORD` como hash bcrypt y validar contra la base de datos.

## Instalación y ejecución

```bash
npm install
npm run dev
```

El servidor quedará disponible en `http://localhost:4000`.

### Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Autenticación y obtención de token JWT. |
| `GET` | `/api/projects` | Lista de proyectos públicos. |
| `GET` | `/api/projects/:id` | Detalle de un proyecto. |
| `POST` | `/api/projects` | Crear proyecto (requiere token). |
| `PUT` | `/api/projects/:id` | Actualizar proyecto (requiere token). |
| `DELETE` | `/api/projects/:id` | Eliminar proyecto (requiere token). |
| `GET` | `/api/config` | Configuración pública del sitio. |
| `PUT` | `/api/config` | Actualizar configuración (requiere token). |
| `GET` | `/api/chat` | Listado de mensajes (requiere token). |
| `POST` | `/api/chat` | Crear mensaje público del chat. |

## Integración con Supabase

La capa de servicios verifica automáticamente si existen las variables `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`. De estar presentes, las operaciones se ejecutan contra las tablas REST. En caso contrario, se utiliza un almacenamiento en memoria útil para desarrollo local.

Tablas sugeridas:

- `projects`
- `site_config`
- `chat_messages`

Consulta la documentación oficial de Supabase para la definición de columnas.

## Estructura de carpetas

```text
src/
  app.js
  server.js
  config/
  controllers/
  middlewares/
  models/
  routes/
  services/
  utils/
```

## Próximos pasos

- Persistir usuarios administradores en Supabase y encriptar contraseñas.
- Implementar pruebas automatizadas.
- Configurar despliegue continuo.
- Añadir paginación y filtros avanzados a los listados de proyectos.
