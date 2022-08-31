import asyncHandler from 'express-async-handler';
import { Log } from '../../../models/logModel.js';

// @desc get user logs by userId
// @route GET /api/admin/logs/user/:id
// @access Private Admin

export const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find({ user: req.params.id }).sort('-updatedAt');
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400);
    throw new Error('Log not found');
  }
});

// @desc delete user log by id
// @router Delete /api/admin/logs/:id
// @access Private Admin

export const deleteLog = asyncHandler(async (req, res) => {
  const log = await Log.findOne({ _id: req.params.id });
  if (!log) {
    res.status(400);
    throw new Error('Log not found');
  }
  await log.remove();
  res.status(200).json({ id: req.params.id });
});
