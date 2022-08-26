import asyncHandler from "express-async-handler";
import { Log } from "../../models/logModel.js";
import { Quiz } from "../../models/quizModel.js";
import { User } from "../../models/userModel.js";
import { Question } from "../../models/questionModel.js";

// @desc get user logs by userId
// @route GET /api/admin/logs/user/:id
// @access Private Admin

export const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find({ id: req.params.id })
    .sort("-updatedAt")
    .populate({
      path: "quiz",
      select: ["title", "questions"],
    })
    .exec();
  if (data) {
    res.status(200).json(data);
  }
});

// @desc get all users
// @route GET /api/users
// @access Private Admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc delete user log by id
// @router Delete /api/admin/logs/:id
// @access Private Admin

export const deleteLog = asyncHandler(async (req, res) => {
  const log = await Log.findOne({ _id: req.params.id });
  if (!log) {
    res.status(400);
    throw new Error("Log not found");
  }
  await log.remove();
  res.status(200).json({ id: req.params.id });
});

// @desc delete user by id
// @route Delete /api/admin/users/:id
// @access Private Adimin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400);
    throw new Error(`There is no user with such id: ${rep.params.id}`);
  }
  if (user) {
    const logs = await Log.find({ user: user._id });
    if (logs) {
      if (logs.length > 0) {
        res.status(400);
        throw new Error(
          "User has logs, consider cleaning user's log before deleting it"
        );
      }
      if (logs.length === 0) {
        await user.remove();
        res.status(200).json({ id: req.params.id });
      }
    }
  }
});

// @desc get quizzes
// @route GET /api/adim/quizzes
// @access Private Admin

export const getQuizzes = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find();
  res.status(200).json(quiz);
});

// @desc get full quiz by id
// @route GET /api/adim/quizzes/:id
// @access Private Admin

export const getFullQuiz = asyncHandler(async (req, res) => {
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

export const addQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({
    title: req.body.title,
  });

  res.status(200).json(quiz);
});

// @desc get question by id
// @route GET /api//questions
// @access Private Adim

export const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findOne({ _id: req.params.id });
  if (question) {
    res.status(200).json(question);
  } else {
    res.status(400);
    throw new Error("Invalid quesition id");
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
    throw new Error("New question has not been created");
  }
});

// @desc create a new question and add it to existing Quiz
// @route POST /api/adim/quizzes/:id
// @access Private Admin

export const createAndAddQuestionToQuiz = asyncHandler(async (req, res) => {
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

// @desc update question
// @route PUT /api/adim/questions/:id
// @access Private Admin
export const updateQuestionData = asyncHandler(async (req, res) => {
  console.log("put updated question");
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
    throw new Error("during updating question something went wrong");
  }
});

// @desc delete qestion by id
// @router Delete /api/admin/questions/:id
// @access Private Admin

export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findOne({ _id: req.params.id });
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }
  await question.remove();
  res.status(200).json({ id: req.params.id });
});

// @desc Delete auiz by id
// @router Delete /api/admin/quizzes/:id
// @access Private Admin

export const deleteQuiz = asyncHandler(async (req, res) => {
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
          console.log("quesetion removed: ", question);
          await question.remove();
        }
      }
      await quiz.remove();
      res.status(200).json({ id: req.params.id });
    }
  }
});
