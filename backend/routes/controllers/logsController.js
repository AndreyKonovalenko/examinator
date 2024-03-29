const asyncHandler = require('express-async-handler');
const Log = require('../../models/logModel');
const Quiz = require('../../models/quizModel');
const culcResult = require('../../utils/culcResult');

// @desc Get user logs
// @route GET /api/logs
// @access Private

const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find({ user: req.user.id })
    .sort('-updatedAt')
    .populate({
      path: 'quiz',
      select: 'updatedAt',
    });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400);
    throw new Error('Log not found');
  }
});

// @desc Get Log by id
// @route GET /api/logs/:id
// @access Private

const getLog = asyncHandler(async (req, res) => {
  const log = await Log.findOne({ _id: req.params.id });
  if (log) {
    res.status(200).json(log);
  } else {
    res.status(400);
    throw new Error('Invalid log id');
  }
});

// @desc Create new Log
// @route POST /apis/log
// @access Private

const setLog = asyncHandler(async (req, res) => {
  const data = req.body;
  const currentQuiz = await Quiz.findOne({ _id: data.id })
    .populate('questions')
    .exec();
  if (currentQuiz) {
    const { questions, title, threshold } = currentQuiz;
    const newLog = await Log.create({
      user: req.user.id,
      name: req.user.name,
      quiz: data.id,
      title: title,
      threshold: threshold,
      answers: data.answers,
      result: culcResult(questions, data.answers),
    });
    if (newLog) {
      res.status(200).json(newLog);
    } else {
      res.status(400);
      throw new Error('New Log has not been created');
    }
  } else {
    res.status(400);
    throw new Error('Quiz not found');
  }
});

module.exports = {
  getLog,
  getLogs,
  setLog,
};
