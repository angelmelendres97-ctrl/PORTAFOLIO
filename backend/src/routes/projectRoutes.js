const { Router } = require('express');
const { body } = require('express-validator');
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', projectController.listProjects);
router.get('/:id', projectController.getProject);

router.post(
  '/',
  authenticateToken,
  [
    body('title').isLength({ min: 3 }).withMessage('El título es obligatorio'),
    body('summary').notEmpty().withMessage('La descripción corta es obligatoria'),
    body('description').notEmpty().withMessage('La descripción es obligatoria')
  ],
  projectController.createProject
);

router.put(
  '/:id',
  authenticateToken,
  [
    body('title').optional().isLength({ min: 3 }).withMessage('El título es obligatorio'),
    body('summary').optional().notEmpty().withMessage('La descripción corta es obligatoria'),
    body('description').optional().notEmpty().withMessage('La descripción es obligatoria')
  ],
  projectController.updateProject
);

router.delete('/:id', authenticateToken, projectController.deleteProject);

module.exports = router;
