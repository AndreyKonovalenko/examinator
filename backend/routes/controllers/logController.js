import asyncHandler from 'express-async-handler';
import { Log } from '../../models/logModel.js';

// @desc Get Questions
// @route GET /api//question
// @access Private

export const getQuestions = asyncHandler(async (req, res) => {
  const quiz = await Question.find().select('-currect');
  // req.user = await User.findById(decoded.id).select('-password') need more deep quiz model
  res.status(200).json(quiz);
});

// @desc Get Question by id
// @route GET /api//question/id
// @access Private

// @desc Create new Question
// @route POST /api/question
// @access Private

export const setQuestion = asyncHandler(async (req, res) => {
  const { question, options, currect } = req.body;
  const newQuestion = await Question.create({
    question,
    options,
    currect,
  });
  if (newQuestion) {
    res.status(200).json(newQuestion);
  } else {
    res.status(400);
    throw new Error('New question has not been created');
  }
});
