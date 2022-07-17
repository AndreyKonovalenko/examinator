import asyncHandler from 'express-async-handler';
import { Quiz } from '../../models/quizModel.js';

// @desc Get Quizzes
// @route GET /api/quiz
// @access Private

export const getQuizzes = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find();
  // req.user = await User.findById(decoded.id).select('-password') need more deep quiz model
  res.status(200).json(quiz);
});

// set quiz for testing
export const setQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({
    title: req.body.title,
  });

  res.status(200).json(quiz);
});

// @desc add Question to quiz by quiz id and existing question id
// @route POST /api/quiz:id
// @access Private

export const addQuestionToQuiz = asyncHandler(async (req, res) => {
  const { questionId } = req.body;
  const currentQuiz = await Quiz.findOne({ _id: req.params.id });
  if (currentQuiz) {
    currentQuiz.questions.push(questionId);
    const upadtaedQuiz = await currentQuiz.save();
    if (upadtaedQuiz) {
      res.status(200).json(upadtaedQuiz);
    } else {
      res.status(400);
      throw new Error('during updating quiz something goes wrong');
    }
  } else {
    res.status(400);
    throw new Error('Ivalid quiz id');
  }
});

// @desc Get populated Quiz without currect answers
// @route GET /api/quiz:id
// @access Private

export const getQuiz = asyncHandler(async (req, res) => {
  const currentQuiz = await Quiz.findOne({ _id: req.params.id })
    .populate({ path: 'questions', select: ['question', 'options'] })
    .exec();
  if (currentQuiz) {
    res.status(200).json(currentQuiz);
  } else {
    res.status(400);
    throw new Error('Invalid quiz id');
  }
});
