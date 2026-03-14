# Angel Melendres - Frontend

Aplicación web construida con React + Vite que muestra el portafolio público e incluye un panel administrativo protegido.

## Características

- Diseño moderno con Tailwind CSS y animaciones mediante Framer Motion
- Efecto Vanta Globe en la sección Hero
- Modo Oscuro/Claro con persistencia
- Consumo de API REST para obtener proyectos, configuración y mensajes
- Context API para manejar sesión y token JWT
- Panel administrativo con módulos de proyectos, configuración y chat
- Editor de texto enriquecido (React Quill) para descripciones detalladas
- Gestión de imágenes: portada y galería para proyectos
- Formulario de contacto público conectado al backend

## Requisitos

- Node.js 18+
- Backend ejecutándose en `http://localhost:4000` (configurable via `.env`)

## Instalación

```bash
npm install
npm run dev
```

La aplicación se servirá en `http://localhost:5173`.

## Variables de Entorno

```env
VITE_API_URL=http://localhost:4000/api
```

## Estructura

```
src/
├── components/       # Componentes reutilizables (Hero, ProjectGrid, etc.)
├── contexts/         # Contextos de React (Auth, Theme)
├── hooks/           # Hooks personalizados
├── layout/          # Layouts (PublicLayout, DashboardLayout)
├── pages/           # Páginas (Home, Admin*, ProjectDetail)
├── services/        # Servicios API (apiClient, portfolioService)
└── styles/          # Estilos (Tailwind)
```

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la versión de producción

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Hook Form
- React Quill
- React Icons
- Axios

---

Para más información, consulta el README principal del proyecto.
