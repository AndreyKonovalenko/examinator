const asyncHandler = require('express-async-handler');
const Quiz = require('../../models/quizModel');

// @desc Get Quizzes
// @route GET /api/quizzes
// @access Private

const getQuizzes = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find();
  // req.user = await User.findById(decoded.id).select('-password') need more deep quiz model
  res.status(200).json(quiz);
});

// @desc Get populated Quiz without currect answers
// @route GET /api/quizzes:id
// @access Private

const getQuiz = asyncHandler(async (req, res) => {
  const currentQuiz = await Quiz.findOne({ _id: req.params.id })
    .populate({
      path: 'questions',
      select: ['question', 'options', 'archived'],
      match: { archived: { $eq: false } },
    })
    .exec();
  if (currentQuiz) {
    res.status(200).json(currentQuiz);
  } else {
    res.status(400);
    throw new Error('Invalid quiz id');
  }
});

module.exports = { getQuizzes, getQuiz };
