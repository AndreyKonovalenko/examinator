import asyncHandler from "express-async-handler";
import { Log } from "../../models/logModel.js";
import { Quiz } from "../../models/quizModel.js";
import { User } from "../../models/userModel.js";

// @desc Get user logs by userId
// @route GET /api/admin/logs/user/:id
// @access Private Admin

export const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find({ user: req.params.id })
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

// @desc Get ALL Users
// @route GET /api/users
// @access Private Admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Delete user log by id
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

// @desc Delete user by id
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

// @desc Get Quizzes
// @route GET /api/adim/quizzes
// @access Private Admin

export const getQuizzes = asyncHandler(async (req, res) => {
  const quiz = await Quiz.find();
  res.status(200).json(quiz);
});

// @desc Get Full Quiz by id
// @route GET /api/adim/quizzes/:id
// @access Private Admin

export const getFullQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findOne({ _id: req.params.id }).populate({
    path: "questions",
  });
  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(400);
    throw new Error("Invalid quiz id");
  }
});

// @desc add  new Quizz
// @route GET /api/adim/quizzes
// @access Private Admin

export const addQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({
    title: req.body.title,
  });

  res.status(200).json(quiz);
});
