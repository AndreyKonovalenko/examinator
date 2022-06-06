import asyncHandler from 'express-async-handler'
import Answers from '../../models/answersModel.js'
// @desc Get Answers
// @route GET /api/answers
// @access Private

const getAnswers = asyncHandler(async (req, res) => {
  const answers = await Answers.find()
  res.status(200).json(answers)
})

// @desc Get Quizz
// @route GET /api/quiz:id
// @access Private

export default { getAnswers }
