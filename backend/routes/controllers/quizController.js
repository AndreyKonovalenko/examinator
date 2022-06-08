import asyncHandler from 'express-async-handler'
import Quiz from '../../models/quizModel.js'
// @desc Get Quizzes
// @route GET /api/quiz
// @access Private

const getQuizzes = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find()
  // req.user = await User.findById(decoded.id).select('-password') need more deep quiz model
  res.status(200).json(quiz)
})

// set quiz for testing
const setQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({
    title: req.body.title,
    questions: req.body.questions,
  })

  res.status(200).json(quiz)
})

// @desc Get Quizz
// @route GET /api/quiz:id
// @access Private

const getQuiz = asyncHandler(async (req, res) => {
  res.status(200).json({ massage: 'GET QUIZ by ID' })
})

export default { getQuizzes, getQuiz, setQuiz }
