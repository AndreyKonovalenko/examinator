import express from 'express'
import controller from './controllers/answersController.js'
const router = express.Router()
const { getAnswers } = controller
// get all quizzes

router.get('/', getAnswers)

// // get quiz by id
// router.get('/:id', (req, res) => controller.getQuiz(req, res));

export default router
