import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle.jsx';

const PublicLayout = ({ children }) => (
  <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-semibold text-xl text-primary">
          Portfolio, Angel Melendres
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex items-center">
          <a href="#proyectos" className="transition hover:text-primary">
            Proyectos
          </a>
          <a href="#sobre-mi" className="transition hover:text-primary">
            Sobre mí
          </a>
          <a href="#contacto" className="transition hover:text-primary">
            Contacto
          </a>
          <Link to="/admin" className="transition hover:text-primary">
            Panel
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      © {new Date().getFullYear()} Angel Melendres. Todos los derechos reservados.
    </footer>
  </div>
);

export default PublicLayout;
