import express from 'express'
import {
  getQuizzes,
  setQuiz,
  getQuiz,
  setQuestion,
  getQuestions,
  addQuestionToQuiz
} from './controllers/quizController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

// get all quizzes

//router.get('/', protect, getQuizzes)
router.get('/', getQuizzes)
// post quiz for test
router.post('/', setQuiz)
// upadate quiz by id
router.post('/:id', addQuestionToQuiz)
// upadate quiz by id
router.get('/question', getQuestions)
router.post('/question', setQuestion)

// get quiz by id, don't have logic yet
router.get('/:id', getQuiz)

export default router
