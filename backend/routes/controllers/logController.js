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
  if (currentQuiz) {
    const { questions } = currentQuiz;
    const result = await culcResult(questions, answers);
    if (result) {
      const newLog = await Log.create({
        user: req.user.id,
        quiz: quizId,
        answers,
        result: result,
      });
      if (newLog) {
        res.status(200).json(newLog);
      } else {
        res.status(400);
        throw new Error('New Log has not been created');
      }
    } else {
      res.status(400);
      throw new Error('Something goes wrong during result calculation');
    }
  } else {
    res.status(400);
    throw new Error('Quiz not found');
  }
});

// util fuction test two array for equality
const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

// answers schema must be
// [
// { qId:_id,
//   answer:[String]
// }
// ]

// calculate result function for log object data
const culcResult = (questions, answers) => {
  let result = 0;
  questions.forEach((element) => {
    const { _id, currect } = element;
    answers.forEach((el) => {
      if (el.qId === _id.toString()) {
        arrayEquals(currect, el.answer) ? (result += 1) : result;
      }
    });
  });
  return result;
};
