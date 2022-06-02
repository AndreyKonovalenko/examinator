// @desc Get Quizzes
// @route GET /api/quiz
// @access Private

const getQuizzes = (req, res) => {
  res.status(200).json({ massage: 'GET ALL Quizzes' })
}

// @desc Get Quizz
// @route GET /api/quiz:id
// @access Private

const getQuiz = (req, res) => {
  res.status(200).json({ massage: 'GET QUIZ by ID' })
}

export default { getQuizzes, getQuiz }
