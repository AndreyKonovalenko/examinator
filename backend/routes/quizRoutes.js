import express from 'express';
import {
  getQuizzes,
  getQuiz,
  addQuestionToQuiz,
  setQuiz,
} from './controllers/quizController.js';
//import protect from '../middleware/authMiddleware.js';
const router = express.Router();

// get all quizzes

//router.get('/', protect, getQuizzes)
router.get('/', getQuizzes);
// get quiz by id, don't have logic yet
router.get('/:id', getQuiz);
// post quiz for test
router.post('/', setQuiz);
// upadate quiz by id
router.post('/:id', addQuestionToQuiz);

export default router;
