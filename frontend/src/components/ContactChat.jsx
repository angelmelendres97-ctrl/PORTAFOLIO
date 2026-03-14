import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitChatMessage } from '../services/portfolioService.js';

const ContactChat = ({ config }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await submitChatMessage(data);
      setStatus({ type: 'success', message: 'Mensaje enviado correctamente. ¡Gracias!' });
      reset();
    } catch (error) {
      setStatus({ type: 'error', message: 'No fue posible enviar el mensaje. Intenta de nuevo.' });
    }
  };

  return (
    <section id="contacto" className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 py-20 transition-colors">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Hablemos de tu próximo proyecto</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Envíame un mensaje directo y conversemos sobre cómo puedo ayudarte a acelerar tus iniciativas digitales.
          </p>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 text-sm text-slate-600 dark:text-slate-300 transition-colors">
            <p>
              <span className="font-medium text-slate-700 dark:text-slate-200">Correo:</span> {config.contactEmail}
            </p>
            <p className="mt-2">
              <span className="font-medium text-slate-700 dark:text-slate-200">WhatsApp:</span> {config.whatsappNumber}
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-6 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/40 transition-colors"
        >
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Nombre completo</label>
            <input
              {...register('name', { required: 'Ingresa tu nombre' })}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-primary focus:outline-none"
              placeholder="Tu nombre"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Correo electrónico</label>
            <input
              type="email"
              {...register('email', { required: 'Ingresa tu email' })}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-primary focus:outline-none"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Mensaje</label>
            <textarea
              rows="4"
              {...register('message', { required: 'Cuéntame sobre tu proyecto' })}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-primary focus:outline-none"
              placeholder="¿En qué puedo ayudarte?"
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:bg-slate-700"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
          {status && (
            <p
              className={`text-sm ${
                status.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactChat;
