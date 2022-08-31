import asyncHandler from 'express-async-handler';
import { Question } from '../../../models/questionModel.js';

// @desc get question by id
// @route GET /api/admin/questions
// @access Private Admin

export const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findOne({ _id: req.params.id });
  if (question) {
    res.status(200).json(question);
  } else {
    res.status(400);
    throw new Error('Invalid quesition id');
  }
});

// setQuestion temporarily unused
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

// @desc update question
// @route PUT /api/adim/questions/:id
// @access Private Admin
export const updateQuestionData = asyncHandler(async (req, res) => {
  console.log('put updated question');
  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (updatedQuestion) {
    res.status(200).json(updatedQuestion);
  } else {
    res.status(400);
    throw new Error('during updating question something went wrong');
  }
});

// @desc delete qestion by id
// @router Delete /api/admin/questions/:id
// @access Private Admin

export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findOne({ _id: req.params.id });
  if (!question) {
    res.status(400);
    throw new Error('Question not found');
  }
  await question.remove();
  res.status(200).json({ id: req.params.id });
});
