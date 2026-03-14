import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import { adminFetchMessages, fetchProjects, fetchSiteConfig } from '../services/portfolioService.js';

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6">
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0 });
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [projectsResponse, messagesResponse, configResponse] = await Promise.all([
          fetchProjects(),
          adminFetchMessages().catch(() => []),
          fetchSiteConfig()
        ]);
        setStats({ projects: projectsResponse.length, messages: messagesResponse.length });
        setConfig(configResponse);
      } catch (error) {
        console.error('Error cargando dashboard', error);
      }
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Resumen general</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Bienvenido, aquí encontrarás una vista rápida del estado de tu portafolio.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Proyectos publicados" value={stats.projects} />
          <StatCard label="Mensajes recibidos" value={stats.messages} />
          <StatCard label="Email de contacto" value={config?.contactEmail ?? 'Sin configurar'} />
        </div>
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Siguientes pasos sugeridos</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Actualiza los textos de tu página principal desde la sección de configuración.</li>
            <li>Publica nuevos proyectos para mantener tu portafolio vigente.</li>
            <li>Responde mensajes recientes desde el módulo de chat.</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
