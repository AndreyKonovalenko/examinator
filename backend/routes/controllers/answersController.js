import asyncHandler from 'express-async-handler'
import Answers from '../../models/answersModel.js'
// @desc Get Answers
// @route GET /api/answers
// @access Private

export const getAnswers = asyncHandler(async (req, res) => {
  const log = {
    title: 'Охрана трудна на предриятии',
    answers: [{ qid: '1', answer: ['2'] }],
  }

  // logic for result culculation
  console.log(log.answers[0].answer[0])
  const data = log.title
  const answers = await Answers.findOne({ data })
  let result = 0

  if (answers) {
    answers.answers[0].answer.forEach((element) => {
      console.log(element)
      if (element === log.answers[0].answer[0]) {
        result = 1
      }
    })
    res.status(200).json({ 'quiz result': result, answers })
  }
})

// @desc Get Quizz
// @route GET /api/quiz:id
// @access Private
