const { v4: uuid } = require('uuid');
const { query } = require('../database/pool');

const normalizeProject = (project) => ({
  id: project.id,
  title: project.title,
  summary: project.summary,
  description: project.description,
  technologies: project.technologies || [],
  repositoryUrl: project.repository_url,
  demoUrl: project.demo_url,
  media: project.media || {},
  featured: project.featured || false,
  createdAt: project.created_at,
  updatedAt: project.updated_at
});

const getProjects = async () => {
  const result = await query(
    'SELECT id, title, summary, description, technologies, repository_url, demo_url, media, featured, created_at, updated_at FROM projects ORDER BY created_at DESC'
  );
  return result.rows.map(normalizeProject);
};

const getProjectById = async (id) => {
  const result = await query(
    'SELECT id, title, summary, description, technologies, repository_url, demo_url, media, featured, created_at, updated_at FROM projects WHERE id = $1',
    [id]
  );
  return result.rows[0] ? normalizeProject(result.rows[0]) : null;
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
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await query(
    `INSERT INTO projects (id, title, summary, description, technologies, repository_url, demo_url, media, featured, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING id, title, summary, description, technologies, repository_url, demo_url, media, featured, created_at, updated_at`,
    [
      newProject.id,
      newProject.title,
      newProject.summary,
      newProject.description,
      newProject.technologies,
      newProject.repositoryUrl,
      newProject.demoUrl,
      JSON.stringify(newProject.media),
      newProject.featured,
      newProject.createdAt,
      newProject.updatedAt
    ]
  );

  return normalizeProject(result.rows[0]);
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
    updatedAt: new Date()
  };

  const result = await query(
    `UPDATE projects SET title = $1, summary = $2, description = $3, technologies = $4, repository_url = $5, demo_url = $6, media = $7, featured = $8, updated_at = $9
     WHERE id = $10
     RETURNING id, title, summary, description, technologies, repository_url, demo_url, media, featured, created_at, updated_at`,
    [
      updated.title,
      updated.summary,
      updated.description,
      updated.technologies,
      updated.repositoryUrl,
      updated.demoUrl,
      JSON.stringify(updated.media),
      updated.featured,
      updated.updatedAt,
      id
    ]
  );

  return normalizeProject(result.rows[0]);
};

const deleteProject = async (id) => {
  const existing = await getProjectById(id);
  if (!existing) {
    const error = new Error('Proyecto no encontrado');
    error.status = 404;
    throw error;
  }

  await query('DELETE FROM projects WHERE id = $1', [id]);
  return { success: true };
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
