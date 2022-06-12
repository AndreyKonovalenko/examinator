import asyncHandler from 'express-async-handler';
import { Log } from '../../models/logModel.js';
import { Quiz } from '../../models/quizModel.js';

// @desc Get all Logs
// @route GET /api/log
// @access Private

export const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find();
  res.status(200).json(data);
});

// @desc Get Log by id
// @route GET /api/log/id
// @access Private

// @desc Create new Log
// @route POST /api/log
// @access Private

export const setLog = asyncHandler(async (req, res) => {
  const { quizId, answers } = req.body;
  const currentQuiz = await Quiz.findOne({ _id: quizId })
    .populate('questions')
    .exec();

  console.log(currentQuiz);
  const currect = 'result need to be calulated';
  const newLog = await Log.create({
    user: req.user.id,
    quiz: quizId,
    answers,
    result: currect,
  });
  if (newLog) {
    res.status(200).json(newLog);
  } else {
    res.status(400);
    throw new Error('New Log has not been created');
  }
});
