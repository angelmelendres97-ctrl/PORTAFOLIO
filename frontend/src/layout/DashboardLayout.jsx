import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const DashboardLayout = ({ children }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/admin', label: 'Resumen' },
    { to: '/admin/projects', label: 'Proyectos' },
    { to: '/admin/config', label: 'Configuración' },
    { to: '/admin/chat', label: 'Chat' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-primary">
            AGX Panel
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span>{user?.email}</span>
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-slate-700 px-3 py-1 transition hover:bg-slate-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row">
        <aside className="w-full md:w-56">
          <nav className="flex flex-row gap-2 overflow-x-auto md:flex-col">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  location.pathname === item.to
                    ? 'bg-primary/20 text-primary'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="flex-1 space-y-6">{children}</section>
      </div>
    </div>
  );
};

export default DashboardLayout;
