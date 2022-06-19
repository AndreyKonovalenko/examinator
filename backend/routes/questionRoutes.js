import express from 'express';
import { setQuestion, getQuestions } from './controllers/questionController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

// get all quetions
router.get('/', protect, getQuestions);
// set new question
router.post('/', protect, setQuestion);

export default router;
