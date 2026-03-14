import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
  detailedDescription: '',
  technologies: '',
  repositoryUrl: '',
  demoUrl: '',
  featured: false
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState(null);
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('coverImage', reader.result);
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setValue('coverImage', '');
    setCoverImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setGalleryPreviews((prev) => [...prev, ...images]);
      setValue('gallery', [...galleryPreviews, ...images].join(','));
    });
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...galleryPreviews];
    newGallery.splice(index, 1);
    setGalleryPreviews(newGallery);
    setValue('gallery', newGallery.join(','));
  };

  const onSubmit = async (values) => {
    setStatus(null);
    const payload = {
      title: values.title,
      summary: values.summary,
      description: description,
      detailedDescription: detailedDescription,
      technologies: values.technologies
        ? values.technologies.split(',').map((item) => item.trim())
        : [],
      repositoryUrl: values.repositoryUrl || null,
      demoUrl: values.demoUrl || null,
      featured: Boolean(values.featured),
      media: {
        image: values.coverImage || null,
        gallery: galleryPreviews
      }
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
      setDescription('');
      setDetailedDescription('');
      setCoverImagePreview(null);
      setGalleryPreviews([]);
      setEditingId(null);
      await loadProjects();
    } catch (error) {
      setStatus({ type: 'error', message: 'No fue posible guardar el proyecto.' });
    }
  };

  const onEdit = (project) => {
    setEditingId(project.id);
    setDescription(project.description || '');
    setDetailedDescription(project.detailedDescription || '');
    setCoverImagePreview(project.media?.image || null);
    setGalleryPreviews(project.media?.gallery || []);
    reset({
      title: project.title,
      summary: project.summary,
      description: project.description,
      detailedDescription: project.detailedDescription,
      technologies: project.technologies?.join(', '),
      repositoryUrl: project.repositoryUrl || '',
      demoUrl: project.demoUrl || '',
      featured: project.featured,
      coverImage: project.media?.image || '',
      gallery: project.media?.gallery?.join(',') || ''
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

  const cancelEdit = () => {
    reset(emptyProject);
    setDescription('');
    setDetailedDescription('');
    setCoverImagePreview(null);
    setGalleryPreviews([]);
    setEditingId(null);
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Gestión de proyectos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Crea, actualiza o elimina los proyectos mostrados en el sitio público.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Título</label>
              <input
                {...register('title', { required: true })}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Resumen corto</label>
              <input
                {...register('summary', { required: true })}
                placeholder="Breve descripción para tarjetas"
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Descripción</label>
            <textarea
              {...register('description')}
              rows="3"
              placeholder="Descripción breve que se muestra en la tarjeta del proyecto"
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Descripción detallada (para modal)</label>
            <div className="mt-1">
              <ReactQuill
                theme="snow"
                value={detailedDescription}
                onChange={setDetailedDescription}
                modules={quillModules}
                className="h-64 dark"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Imagen de portada</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleCoverImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Seleccionar imagen
              </button>
              {coverImagePreview && (
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
                    <img src={coverImagePreview} alt="Cover" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="absolute right-1 top-1 rounded bg-red-500 p-1 text-white"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Galería de imágenes</label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={galleryInputRef}
                onChange={handleGalleryChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Agregar imágenes
              </button>
              {galleryPreviews.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {galleryPreviews.map((img, index) => (
                    <div key={index} className="relative h-20 w-32 overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
                      <img src={img} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute right-1 top-1 rounded bg-red-500 p-1 text-white text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Tecnologías (separadas por coma)</label>
              <input
                {...register('technologies')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" {...register('featured')} className="h-4 w-4" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Destacado</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Repositorio</label>
              <input
                {...register('repositoryUrl')}
                className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Demo</label>
              <input
                {...register('demoUrl')}
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
              {editingId ? 'Actualizar proyecto' : 'Crear proyecto'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm text-slate-500 hover:text-primary"
              >
                Cancelar edición
              </button>
            )}
            {status && (
              <span
                className={`text-sm ${
                  status.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                }`}
              >
                {status.message}
              </span>
            )}
          </div>
        </form>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Proyectos publicados</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{project.summary}</p>
                  </div>
                  {project.featured && (
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Destacado</span>
                  )}
                </div>
                {project.media?.image && (
                  <img
                    src={project.media.image}
                    alt={project.title}
                    className="h-32 w-full rounded-lg object-cover"
                  />
                )}
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-200 dark:bg-slate-800 px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1 text-slate-700 dark:text-slate-300 transition hover:border-primary hover:text-primary"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(project.id)}
                    className="rounded-lg border border-red-500/40 px-3 py-1 text-red-500 transition hover:border-red-500 hover:text-red-400"
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
