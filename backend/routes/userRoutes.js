import express from 'express';
import { login, getMe, registerUser } from './controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
