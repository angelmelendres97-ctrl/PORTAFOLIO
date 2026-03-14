import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GlobeEffect from './GlobeEffect.jsx';

const Hero = ({ config }) => {
  const profileImage = config.profileImage || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80';

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <GlobeEffect />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 md:flex-row md:items-center">
        <div className="space-y-6 md:w-2/3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-primary"
          >
            Portafolio 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {config.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-lg text-slate-300"
          >
            {config.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${config.contactEmail}`}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-blue-500"
              >
                Agendar reunión
              </a>
              <a
                href={config.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-primary hover:text-primary"
              >
                Descargar CV
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 text-slate-400"
          >
            <span className="text-xs uppercase tracking-[0.3em]">Sígueme</span>
            <a href={config.githubUrl} target="_blank" rel="noreferrer" className="transition hover:text-primary">
              <FaGithub size={20} />
            </a>
            <a href={config.linkedinUrl} target="_blank" rel="noreferrer" className="transition hover:text-primary">
              <FaLinkedin size={20} />
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mx-auto h-72 w-72 overflow-hidden rounded-full border-4 border-primary/20 shadow-2xl"
        >
          <img 
            src={profileImage} 
            alt="Perfil" 
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
