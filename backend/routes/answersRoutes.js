import express from 'express'
import { getAnswers } from './controllers/answersController.js'
const router = express.Router()

// get all quizzes

router.get('/', getAnswers)

// // get quiz by id
// router.get('/:id', (req, res) => controller.getQuiz(req, res));

export default router
