import React from 'react';

const AboutSection = ({ config }) => (
  <section id="sobre-mi" className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 py-20 transition-colors">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Experiencia y enfoque</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">{config.about}</p>
      </div>
      <div className="space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 transition-colors">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Datos de contacto</h3>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            <span className="font-medium text-slate-700 dark:text-slate-200">Email:</span> {config.contactEmail}
          </p>
          <p>
            <span className="font-medium text-slate-700 dark:text-slate-200">WhatsApp:</span> {config.whatsappNumber}
          </p>
          <div className="flex gap-4 pt-2 text-sm">
            <a className="text-primary hover:underline" href={config.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="text-primary hover:underline" href={config.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
