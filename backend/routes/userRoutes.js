import express from 'express';

import { login, registerUser } from './controllers/userController.js';
const router = express.Router();

router.post('/', registerUser);
router.post('/login', login);
//router.get("/me", protect, getMe);

export default router;
