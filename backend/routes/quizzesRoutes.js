import express from 'express';
import {
  getQuizzes,
  getQuiz,
  addQuestionToQuiz,
  setQuiz,
} from './controllers/quizzesController.js';
import isAdmin from '../middleware/adminMiddleware.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

// get all quizzes

router.get('/', protect, getQuizzes);
// get quiz by id, don't have logic yet
router.get('/:id', protect, getQuiz);
// post quiz for test
router.post('/', protect, setQuiz);
// upadate quiz by id
router.post('/:id', protect, addQuestionToQuiz);

export default router;
