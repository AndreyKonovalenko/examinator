import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import { Quiz, Question } from '../../models/quizModel.js'
// @desc Get Quizzes
// @route GET /api/quiz
// @access Private

export const getQuizzes = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find()
  // req.user = await User.findById(decoded.id).select('-password') need more deep quiz model
  res.status(200).json(quiz)
})

// set quiz for testing
export const setQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({
    title: req.body.title,
  })

  res.status(200).json(quiz)
})

// @desc add Question to quiz by quiz id and existing question id
// @route POST /api/quiz/id
// @access Private

export const addQuestionToQuiz = asyncHandler(async (req, res) => {
  const { id } = req.body
  const currentQuiz = await Quiz.findById(req.params.id)
  if (currentQuiz) {
    currentQuiz.questions.push(id)
    const upadtaedQuiz = await currentQuiz.save()
    if (upadtaedQuiz) {
      res.status(200).json(upadtaedQuiz)
    } else {
      res.status(400)
      throw new Error('during updating quiz something goes wrong')
    }
  } else {
    res.status(400)
    throw new Error('Ivalid quiz id')
  }
})

// @desc Get Questions
// @route GET /api/quiz/question
// @access Private

export const getQuestions = asyncHandler(async (req, res) => {
  const quiz = await Question.find().select('-currect')
  // req.user = await User.findById(decoded.id).select('-password') need more deep quiz model
  res.status(200).json(quiz)
})

// create new Question in the database
export const setQuestion = asyncHandler(async (req, res) => {
  const { question, options, currect } = req.body
  const newQuestion = await Question.create({
    _id: new mongoose.Types.ObjectId(),
    question,
    options,
    currect,
  })
  if (newQuestion) {
    res.status(200).json(newQuestion)
  } else {
    res.status(400)
    throw new Error('New question has not been created')
  }
})

// @desc Get Quizz
// @route GET /api/quiz:id
// @access Private

export const getQuiz = asyncHandler(async (req, res) => {
  res.status(200).json({ massage: 'GET QUIZ by ID' })
})
