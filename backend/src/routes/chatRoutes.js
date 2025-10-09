const { Router } = require('express');
const { body } = require('express-validator');
const chatController = require('../controllers/chatController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', authenticateToken, chatController.listMessages);
router.post(
  '/',
  [
    body('name').isLength({ min: 2 }).withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('message').isLength({ min: 5 }).withMessage('El mensaje es obligatorio')
  ],
  chatController.createMessage
);

module.exports = router;
