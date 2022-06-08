import express from 'express'
import controller from './controllers/quizController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()
const { getQuizzes, setQuiz, getQuiz } = controller
// get all quizzes

router.get('/', protect, getQuizzes)
// post quiz for test
router.post('/', setQuiz)
// get quiz by id, don't have logic yet
router.get('/:id', getQuiz)

export default router
