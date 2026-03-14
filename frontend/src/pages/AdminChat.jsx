import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import { adminFetchMessages } from '../services/portfolioService.js';

const AdminChat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminFetchMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error al cargar mensajes', error);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Mensajes recibidos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Revisa y atiende las conversaciones generadas desde el chat público.</p>
        </div>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 text-sm text-slate-500 dark:text-slate-400">
              Aún no has recibido mensajes. Comparte tu portafolio para iniciar conversaciones.
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className="space-y-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{message.name}</p>
                  <a href={`mailto:${message.email}`} className="text-xs text-primary hover:underline">
                    {message.email}
                  </a>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(message.createdAt).toLocaleString('es-CO', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminChat;
