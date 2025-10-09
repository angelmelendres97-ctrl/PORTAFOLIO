import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const AdminLogin = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [formError, setFormError] = useState(null);

  const onSubmit = async (values) => {
    setFormError(null);
    const response = await login(values);
    if (!response.success) {
      setFormError(response.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-white">Panel Administrativo</h1>
          <p className="text-sm text-slate-400">Inicia sesión para gestionar tu portafolio.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium text-slate-200">Correo electrónico</label>
            <input
              type="email"
              {...register('email', { required: 'Ingresa tu correo' })}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-200">Contraseña</label>
            <input
              type="password"
              {...register('password', { required: 'Ingresa tu contraseña' })}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
          {formError && <p className="text-sm text-red-400">{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
