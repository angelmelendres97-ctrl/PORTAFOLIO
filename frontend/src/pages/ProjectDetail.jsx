import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { useFetch } from '../hooks/useFetch';
import { fetchProjectById } from '../services/portfolioService.js';

const ProjectDetail = ({ projectId, onClose }) => {
  const { data: project, loading, error } = useFetch(() => fetchProjectById(projectId), [projectId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 text-center">
          <p className="text-red-500">Error al cargar el proyecto</p>
          <button onClick={onClose} className="mt-4 text-primary">Cerrar</button>
        </div>
      </div>
    );
  }

  const gallery = project.media?.gallery || [];
  const showDetailed = project.detailedDescription && project.detailedDescription !== project.description;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-950 shadow-2xl"
        >
          <div className="relative">
            <img
              src={project.media?.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
              alt={project.title}
              className="h-64 w-full object-cover md:h-80"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                  {project.title}
                </h1>
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
                  {project.summary}
                </p>
              </div>
              {project.featured && (
                <span className="rounded-full bg-primary/20 px-4 py-1 text-sm text-primary">
                  Destacado
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-200 dark:bg-slate-800 px-4 py-1 text-sm text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {showDetailed && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Descripción</h2>
                <div 
                  className="prose prose-slate dark:prose-invert mt-3 max-w-none text-slate-600 dark:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: project.detailedDescription }}
                />
              </div>
            )}

            {!showDetailed && project.description && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Descripción</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
              </div>
            )}

            {gallery.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Galería</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${project.title} - Imagen ${index + 1}`}
                      className="aspect-video rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-slate-700 dark:text-slate-300 transition hover:border-primary hover:text-primary"
                >
                  <FaGithub /> Ver Código
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-blue-500"
                >
                  <FaExternalLinkAlt /> Ver Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;
