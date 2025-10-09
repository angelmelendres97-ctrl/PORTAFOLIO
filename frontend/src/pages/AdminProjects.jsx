import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import {
  adminCreateProject,
  adminDeleteProject,
  adminUpdateProject,
  fetchProjects
} from '../services/portfolioService.js';

const emptyProject = {
  title: '',
  summary: '',
  description: '',
  technologies: '',
  repositoryUrl: '',
  demoUrl: '',
  featured: false
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({ defaultValues: emptyProject });

  const loadProjects = async () => {
    try {
      const response = await fetchProjects();
      setProjects(response);
    } catch (error) {
      setStatus({ type: 'error', message: 'No fue posible cargar los proyectos.' });
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const onSubmit = async (values) => {
    setStatus(null);
    const payload = {
      ...values,
      technologies: values.technologies
        ? values.technologies.split(',').map((item) => item.trim())
        : []
    };

    try {
      if (editingId) {
        await adminUpdateProject(editingId, payload);
        setStatus({ type: 'success', message: 'Proyecto actualizado correctamente.' });
      } else {
        await adminCreateProject(payload);
        setStatus({ type: 'success', message: 'Proyecto creado correctamente.' });
      }
      reset(emptyProject);
      setEditingId(null);
      await loadProjects();
    } catch (error) {
      setStatus({ type: 'error', message: 'No fue posible guardar el proyecto.' });
    }
  };

  const onEdit = (project) => {
    setEditingId(project.id);
    reset({
      title: project.title,
      summary: project.summary,
      description: project.description,
      technologies: project.technologies?.join(', '),
      repositoryUrl: project.repositoryUrl || '',
      demoUrl: project.demoUrl || '',
      featured: project.featured
    });
  };

  const onDelete = async (id) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    try {
      await adminDeleteProject(id);
      setStatus({ type: 'success', message: 'Proyecto eliminado.' });
      await loadProjects();
    } catch (error) {
      setStatus({ type: 'error', message: 'No fue posible eliminar el proyecto.' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gestión de proyectos</h1>
          <p className="text-sm text-slate-400">Crea, actualiza o elimina los proyectos mostrados en el sitio público.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-200">Título</label>
              <input
                {...register('title', { required: true })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Descripción corta</label>
              <input
                {...register('summary', { required: true })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-200">Descripción</label>
            <textarea
              rows="4"
              {...register('description', { required: true })}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-200">Tecnologías (separadas por coma)</label>
              <input
                {...register('technologies')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" {...register('featured')} className="h-4 w-4" />
              <span className="text-sm text-slate-300">Destacado</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-200">Repositorio</label>
              <input
                {...register('repositoryUrl')}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Demo</label>
              <input
                {...register('demoUrl')}
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
              {editingId ? 'Actualizar proyecto' : 'Crear proyecto'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  reset(emptyProject);
                  setEditingId(null);
                }}
                className="text-sm text-slate-300 hover:text-primary"
              >
                Cancelar edición
              </button>
            )}
            {status && (
              <span
                className={`text-sm ${
                  status.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {status.message}
              </span>
            )}
          </div>
        </form>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Proyectos publicados</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-slate-400">{project.summary}</p>
                  </div>
                  {project.featured && (
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Destacado</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-800 px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="rounded-lg border border-slate-700 px-3 py-1 text-slate-300 transition hover:border-primary hover:text-primary"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(project.id)}
                    className="rounded-lg border border-red-500/40 px-3 py-1 text-red-400 transition hover:border-red-500 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProjects;
