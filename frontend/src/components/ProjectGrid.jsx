import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-900/40"
  >
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
      <img
        src={project.media?.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'}
        alt={project.title}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="mt-6 flex flex-1 flex-col gap-4">
      <div>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-400">
        {project.technologies?.map((tech) => (
          <span key={tech} className="rounded-full bg-slate-800 px-3 py-1">
            {tech}
          </span>
        ))}
      </div>
      <p className="text-sm text-slate-400 line-clamp-3">{project.description}</p>
      <div className="mt-auto flex gap-3 pt-4 text-sm font-medium">
        {project.repositoryUrl && (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 transition hover:border-primary hover:text-primary"
          >
            <FaGithub /> Código
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-primary transition hover:bg-primary/30"
          >
            <FaExternalLinkAlt /> Demo
          </a>
        )}
      </div>
    </div>
  </motion.article>
);

const ProjectGrid = ({ projects }) => (
  <section id="proyectos" className="bg-slate-950 py-20">
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Proyectos destacados</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Selección de soluciones diseñadas para maximizar el impacto del producto y la eficiencia del equipo.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectGrid;
