import asyncHandler from 'express-async-handler';
import { Log } from '../../models/logModel.js';
import { User } from '../../models/userModel.js';
import { Quiz } from '../../models/quizModel.js';

// @desc Get user logs by userId
// @route GET /api/admin/logs/user:id
// @access Private Admin

export const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find({ user: req.params.id })
    .sort('-updatedAt')
    .populate({
      path: 'quiz',
      select: ['title', 'questions'],
    })
    .exec();
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400);
    throw new Error('Log not found');
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
// @router Delete /api/admin/logs:id
// @access Private Admin

export const deleteLog = asyncHandler(async (req, res) => {
  const log = await Log.findOne({ _id: req.params.id });

  if (!log) {
    res.status(400);
    throw new Error('Log not found');
  }
  await log.remove();
  res
    .status(200)
    .json(`log id: ${req.params.id} has been deleted successfully`);
});
