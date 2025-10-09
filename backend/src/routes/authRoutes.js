const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  authController.login
);

module.exports = router;
