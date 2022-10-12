const asyncHandler = require('express-async-handler');
const Log = require('../../../models/logModel');
const Question = require('../../../models/questionModel');
// @desc get user logs by userId
// @route GET /api/admin/logs/user/:id
// @access Private Admin

const getLogs = asyncHandler(async (req, res) => {
  const data = await Log.find({ user: req.params.id })
    .sort('-updatedAt')
    .populate({
      path: 'quiz',
      select: 'updatedAt',
    });
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

const deleteLog = asyncHandler(async (req, res) => {
  const log = await Log.findOne({ _id: req.params.id });
  if (!log) {
    res.status(400);
    throw new Error('Log not found');
  }
  await log.remove();
  res.status(200).json({ id: req.params.id });
});

// @desc Get user Full log by id
// @router GET /api/admin/logs/:id
// @access Private Admin

const getLog = asyncHandler(async (req, res) => {
  const log = await Log.findOne({ _id: req.params.id });
  if (log) {
    const fullAnswers = await Question.find()
      .where('_id')
      .in(log.answers.map((element) => element.qId))
      .exec();
    if (fullAnswers) {
      log.answers.forEach((element) => {
        const question = fullAnswers.find(
          (elem) => elem._id.toString() === element.qId
        );
        Object.assign(element, { question: question });
      });
      res.status(200).json(log);
    }
  } else {
    res.status(400);
    throw new Error('Invalid log id');
  }
});

module.exports = { getLogs, deleteLog, getLog };
