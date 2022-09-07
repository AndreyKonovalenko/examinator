const asyncHandler = require("express-async-handler");
const Question = require("../../models/questionModel");

// @desc Get Questions
// @route GET /api//questions
// @access Private

const getQuestions = asyncHandler(async (req, res) => {
  const data = await Question.find().select("-currect");
  // req.user = await User.findById(decoded.id).select('-password') need more deep quiz model
  res.status(200).json(data);
});

// @desc Create new Question
// @route POST /api/questions
// @access Private

const setQuestion = asyncHandler(async (req, res) => {
  const { question, options, currect } = req.body;
  const newQuestion = await Question.create({
    question,
    options,
    currect,
    archived: false,
  });
  if (newQuestion) {
    res.status(200).json(newQuestion);
  } else {
    res.status(400);
    throw new Error("New question has not been created");
  }
});

module.exports = {
  getQuestions,
  setQuestion,
};
