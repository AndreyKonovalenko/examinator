import express from 'express'
import controller from './controllers/quizController.js'
const router = express.Router()
const { getQuizzes, setQuiz, getQuiz } = controller
// get all quizzes

router.get('/', getQuizzes)
// post quiz for test
router.post('/', setQuiz)
// get quiz by id
router.get('/:id', getQuiz)

export default router
