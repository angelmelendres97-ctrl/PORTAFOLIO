const { validationResult } = require('express-validator');
const projectService = require('../services/projectService');

const listProjects = async (req, res, next) => {
  try {
    const data = await projectService.getProjects();
    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    return res.json(project);
  } catch (error) {
    return next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await projectService.createProject(req.body);
    return res.status(201).json(project);
  } catch (error) {
    return next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await projectService.updateProject(req.params.id, req.body);
    return res.json(project);
  } catch (error) {
    return next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
