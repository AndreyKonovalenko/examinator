import asyncHandler from "express-async-handler";
import { Log } from "../../models/logModel.js";
import { Quiz } from "../../models/quizModel.js";
import { culcResult } from "../../utils/culcResult.js";

// @desc Get user logs
// @route GET /api/logs
// @access Private

export const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find({ user: req.user.id })
    .sort("-updatedAt")
    .populate({
      path: "quiz",
      select: "updatedAt",
    });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400);
    throw new Error("Log not found");
  }
});

// @desc Get Log by id
// @route GET /api/logs/:id
// @access Private

export const getLog = asyncHandler(async (req, res) => {
  const log = await Log.findOne({ _id: req.params.id }).populate("updatedAt");
  if (log) {
    res.status(200).json(log);
  } else {
    res.status(400);
    throw new Error("Invalid log id");
  }
});

// @desc Create new Log
// @route POST /apis/log
// @access Private

export const setLog = asyncHandler(async (req, res) => {
  const data = req.body;
  const currentQuiz = await Quiz.findOne({ _id: data.id })
    .populate("questions")
    .exec();
  if (currentQuiz) {
    const { questions, title } = currentQuiz;
    const newLog = await Log.create({
      user: req.user.id,
      name: req.user.name,
      quiz: data.id,
      title: title,
      answers: data.answers,
      result: culcResult(questions, data.answers),
    });
    if (newLog) {
      res.status(200).json(newLog);
    } else {
      res.status(400);
      throw new Error("New Log has not been created");
    }
  } else {
    res.status(400);
    throw new Error("Quiz not found");
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

// calculate result function for log object data
const culcResult = (questions, answers) => {
  let result = 0;
  questions.forEach((element) => {
    const { _id, currect } = element;
    answers.forEach((el) => {
      if (el.qId === _id.toString()) {
        const test = arrayEquals(currect, el.answer);
        test ? (result += 1) : result;
      }
    });
  });
  return result;
};
