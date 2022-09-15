const asyncHandler = require("express-async-handler");
const Quiz = require("../../../models/quizModel");
const Question = require("../../../models/questionModel");

// @desc get quizzes
// @route GET /api/adim/quizzes
// @access Private Admin

const getQuizzes = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find();
  res.status(200).json(quiz);
});

// @desc get full quiz by id
// @route GET /api/adim/quizzes/:id
// @access Private Admin

const getFullQuiz = asyncHandler(async (req, res) => {
  let populateConfig;
  if (req.query.filtered === "true") {
    populateConfig = {
      path: "questions",
      match: { archived: false },
    };
  }
  if (req.query.filtered === "false") {
    populateConfig = { path: "questions" };
  }

  const quiz = await Quiz.findOne({ _id: req.params.id }).populate(
    populateConfig
  );
  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(400);
    throw new Error("Invalid quiz id");
  }
});

// @desc add new quizz
// @route POST /api/adim/quizzes
// @access Private Admin

const addQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({
    title: req.body.title,
  });

  res.status(200).json(quiz);
});

// @desc Delete auiz by id
// @router Delete /api/admin/quizzes/:id
// @access Private Admin

const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findOne({ _id: req.params.id });
  if (!quiz) {
    res.status(400);
    throw new Error("Quiz not found");
  }
  if (quiz) {
    if (quiz.questions.length === 0) {
      await quiz.remove();
      res.status(200).json({ id: req.params.id });
    }
    if (quiz.questions.length > 0) {
      for (const element of quiz.questions) {
        const question = await Question.findOne({ _id: element });
        // if (!question) {
        //   res.status(400);
        //   throw new Error('Question not found');
        // }
        if (question) {
          await question.remove();
        }
      }
      await quiz.remove();
      res.status(200).json({ id: req.params.id });
    }
  }
});

// @desc create a new question and add it to existing Quiz
// @route POST /api/adim/quizzes/:id
// @access Private Admin

const createAndAddQuestionToQuiz = asyncHandler(async (req, res) => {
  const { question, options, currect } = req.body;
  const currentQuiz = await Quiz.findOne({ _id: req.params.id });
  if (currentQuiz) {
    const newQuestion = await Question.create({
      question,
      options,
      currect,
      archived: false,
    });
    if (newQuestion) {
      currentQuiz.questions.push(newQuestion._id);
      const upadatedQuiz = await currentQuiz.save();
      if (upadatedQuiz) {
        res.status(200).json(newQuestion);
      } else {
        res.status(400);
        throw new Error("during updating quiz something went wrong");
      }
    } else {
      res.status(400);
      throw new Error("New question has not been created");
    }
  } else {
    res.status(400);
    throw new Error("Ivalid quiz id");
  }
});

module.exports = {
  getQuizzes,
  deleteQuiz,
  getFullQuiz,
  addQuiz,
  createAndAddQuestionToQuiz,
};
