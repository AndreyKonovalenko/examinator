import express from 'express';
import { getLogs, getUsers, deleteLog } from './controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
const router = express.Router();

// get all user logs
router.get('/logs/user/:id', protect, isAdmin, getLogs);

// all users
router.get('/users', protect, isAdmin, getUsers);
// delete log by id
router.delete('/logs/:id', protect, isAdmin, deleteLog);

export default router;
