import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import { adminUpsertConfig, fetchSiteConfig } from '../services/portfolioService.js';

const AdminConfig = () => {
  const [status, setStatus] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting }
  } = useForm();

  useEffect(() => {
    const load = async () => {
      const config = await fetchSiteConfig();
      reset(config);
      if (config.profileImage) {
        setProfileImagePreview(config.profileImage);
      }
    };
    load();
  }, [reset]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('profileImage', reader.result);
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setValue('profileImage', '');
    setProfileImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Configuración del sitio</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Actualiza los textos principales y canales de contacto del portafolio.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Imagen de perfil</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Seleccionar imagen
              </button>
              <input type="hidden" {...register('profileImage')} />
              {profileImagePreview && (
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-slate-300 dark:border-slate-600">
                    <img src={profileImagePreview} alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={removeProfileImage}
                    className="rounded-lg border border-red-500/40 px-3 py-1 text-sm text-red-500 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Título principal</label>
              <input
                {...register('heroTitle')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Subtítulo</label>
              <input
                {...register('heroSubtitle')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Descripción</label>
            <textarea
              rows="4"
              {...register('about')}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Correo de contacto</label>
              <input
                type="email"
                {...register('contactEmail')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">WhatsApp</label>
              <input
                {...register('whatsappNumber')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">GitHub</label>
              <input
                {...register('githubUrl')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">LinkedIn</label>
              <input
                {...register('linkedinUrl')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">URL CV</label>
              <input
                {...register('resumeUrl')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:bg-slate-600"
            >
              Guardar cambios
            </button>
            {status && (
              <span className={`text-sm ${status.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
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
