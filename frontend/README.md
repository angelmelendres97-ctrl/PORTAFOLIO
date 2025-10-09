# AGX Portfolio Frontend

Aplicación web construida con React + Vite que muestra el portafolio público e incluye un panel administrativo protegido.

## Características

- Diseño moderno con Tailwind CSS y animaciones mediante Framer Motion.
- Consumo de API REST para obtener proyectos, configuración y mensajes.
- Context API para manejar sesión y token JWT.
- Panel administrativo con módulos de proyectos, configuración y chat.
- Formulario de contacto público conectado al backend.

## Requisitos

- Node.js 18+
- Backend ejecutándose en `http://localhost:4000` (configurable via `.env`).

## Instalación

```bash
npm install
npm run dev
```

La aplicación se servirá en `http://localhost:5173`.

## Variables de entorno

```env
VITE_API_URL=http://localhost:4000/api
```

## Estructura

```text
src/
  components/
  contexts/
  hooks/
  layout/
  pages/
  services/
  styles/
```

## Próximos pasos

- Integrar manejo de roles y creación de múltiples usuarios.
- Añadir notificaciones en tiempo real para el chat.
- Implementar pruebas unitarias y de integración.
