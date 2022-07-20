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
    console.log(data);
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
// @router Delete /api/admin/logs:id
// @access Private Admin

export const deleteLog = asyncHandler(async (req, res) => {
  const log = await Log.find({ _id: req.params.id });
  if (!log) {
    res.status(400);
    throw new Error('Log not found');
  }
  await log.remove();
  res.status(200).json({ id: req.params.id });
});

// @desc Delete user by id
// @route Delete /api/admin/users:id
// @access Private Adimin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400);
    throw new Error(`There is no user with such id: ${rep.params.id}`);
  }
  if (user) {
    const logs = await Log.find(user._id);
    if (logs) {
      if (logs.length > 0) {
        res.status(200).json({ logs: true });
        // need add to admin slice logic for handling logs:true
        throw new Error(
          "User has logs, consider cleaning user's log before deleting user"
        );
      }
      if (logs.length === 0) {
        await user.remove();
        res.status(200).json({ id: req.params.id });
      }
    }
  }
});
