const { Router } = require('express');
const { body } = require('express-validator');
const configController = require('../controllers/configController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', configController.getSiteConfig);
router.put(
  '/',
  authenticateToken,
  [
    body('heroTitle').optional().isLength({ min: 6 }).withMessage('El título debe tener al menos 6 caracteres'),
    body('heroSubtitle').optional().isLength({ min: 10 }).withMessage('El subtítulo debe tener al menos 10 caracteres'),
    body('contactEmail').optional().isEmail().withMessage('Email de contacto inválido'),
    body('whatsappNumber').optional().isString()
  ],
  configController.updateSiteConfig
);

module.exports = router;
