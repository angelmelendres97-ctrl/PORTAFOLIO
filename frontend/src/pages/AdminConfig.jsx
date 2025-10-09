import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import { adminUpsertConfig, fetchSiteConfig } from '../services/portfolioService.js';

const AdminConfig = () => {
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  useEffect(() => {
    const load = async () => {
      const config = await fetchSiteConfig();
      reset(config);
    };
    load();
  }, [reset]);

  const onSubmit = async (values) => {
    setStatus(null);
    try {
      await adminUpsertConfig(values);
      setStatus({ type: 'success', message: 'Configuración actualizada correctamente.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'No fue posible actualizar la configuración.' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Configuración del sitio</h1>
          <p className="text-sm text-slate-400">Actualiza los textos principales y canales de contacto del portafolio.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-200">Título principal</label>
              <input
                {...register('heroTitle')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Subtítulo</label>
              <input
                {...register('heroSubtitle')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-200">Descripción</label>
            <textarea
              rows="4"
              {...register('about')}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-200">Correo de contacto</label>
              <input
                type="email"
                {...register('contactEmail')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">WhatsApp</label>
              <input
                {...register('whatsappNumber')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-200">GitHub</label>
              <input
                {...register('githubUrl')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">LinkedIn</label>
              <input
                {...register('linkedinUrl')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">URL CV</label>
              <input
                {...register('resumeUrl')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              Guardar cambios
            </button>
            {status && (
              <span className={`text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {status.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AdminConfig;
