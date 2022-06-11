import express from 'express';
import { setQuestion, getQuestions } from './controllers/questionController.js';
//import protect from '../middleware/authMiddleware.js';
const router = express.Router();

// get all quetions
router.get('/', getQuestions);
// set new question
router.post('/', setQuestion);

export default router;
