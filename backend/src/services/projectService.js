const { v4: uuid } = require('uuid');
const { hasValidSupabaseConfig, supabaseFetch } = require('../utils/supabaseClient');
const { projects } = require('../models/inMemoryStore');
const config = require('../config/env');

const selectClause = 'id,title,summary,description,technologies,repositoryUrl,demoUrl,media,featured,createdAt,updatedAt';

const normalizeProject = (project) => ({
  ...project,
  technologies: project.technologies || [],
  media: project.media || {}
});

const getProjects = async () => {
  if (!hasValidSupabaseConfig()) {
    return projects.map(normalizeProject);
  }

  const data = await supabaseFetch(`${config.supabase.projectTable}?select=${selectClause}`);
  return data.map(normalizeProject);
};

const getProjectById = async (id) => {
  if (!hasValidSupabaseConfig()) {
    return projects.find((project) => project.id === id) || null;
  }

  const data = await supabaseFetch(`${config.supabase.projectTable}?id=eq.${id}&select=${selectClause}`);
  return data[0] ? normalizeProject(data[0]) : null;
};

const createProject = async (payload) => {
  const newProject = {
    id: payload.id || uuid(),
    title: payload.title,
    summary: payload.summary,
    description: payload.description,
    technologies: payload.technologies || [],
    repositoryUrl: payload.repositoryUrl || null,
    demoUrl: payload.demoUrl || null,
    media: payload.media || {},
    featured: Boolean(payload.featured),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!hasValidSupabaseConfig()) {
    projects.push(newProject);
    return newProject;
  }

  const inserted = await supabaseFetch(config.supabase.projectTable, {
    method: 'POST',
    body: JSON.stringify([newProject])
  });

  return inserted?.[0] || newProject;
};

const updateProject = async (id, payload) => {
  const existing = await getProjectById(id);
  if (!existing) {
    const error = new Error('Proyecto no encontrado');
    error.status = 404;
    throw error;
  }

  const updated = {
    ...existing,
    ...payload,
    technologies: payload.technologies || existing.technologies,
    media: payload.media || existing.media,
    updatedAt: new Date().toISOString()
  };

  if (!hasValidSupabaseConfig()) {
    const index = projects.findIndex((project) => project.id === id);
    projects[index] = updated;
    return updated;
  }

  const response = await supabaseFetch(`${config.supabase.projectTable}?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updated)
  });

  return response?.[0] || updated;
};

const deleteProject = async (id) => {
  const existing = await getProjectById(id);
  if (!existing) {
    const error = new Error('Proyecto no encontrado');
    error.status = 404;
    throw error;
  }

  if (!hasValidSupabaseConfig()) {
    const index = projects.findIndex((project) => project.id === id);
    projects.splice(index, 1);
    return { success: true };
  }

  await supabaseFetch(`${config.supabase.projectTable}?id=eq.${id}`, {
    method: 'DELETE'
  });

  return { success: true };
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
