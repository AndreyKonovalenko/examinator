import express from 'express';
import { setLog, getLogs } from './controllers/logController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

// get all quetions
router.get('/', getLogs);
// set new question
router.post('/', protect, setLog);

export default router;
