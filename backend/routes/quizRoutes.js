import express from 'express'
import controller from './controllers/quizController.js'
const router = express.Router()
// get all quizzes

router.get('/', (req, res) => controller.getQuizzes(req, res))
// get quiz by id
router.get('/:id', (req, res) => controller.getQuiz(req, res))

export default router
