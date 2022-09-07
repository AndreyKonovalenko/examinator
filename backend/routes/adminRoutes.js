const express = require("express");

const {
  getUsers,
  deleteUser,
} = require("./controllers/admin/adminUsersController");
const {
  getLogs,
  deleteLog,
} = require("./controllers/admin/adminLogsController");
const {
  getQuizzes,
  getFullQuiz,
  addQuiz,
  createAndAddQuestionToQuiz,
  deleteQuiz,
} = require("./controllers/admin/adminQuizzesController");
const {
  getQuestion,
  updateQuestionData,
  deleteQuestion,
} = require("./controllers/admin/adminQuiestionsController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

// all users
router.get("/users", protect, isAdmin, getUsers);
// delete users
router.delete("/users/:id", protect, isAdmin, deleteUser);

// get all user logs
router.get("/logs/user/:id", protect, isAdmin, getLogs);
// delete log by id
router.delete("/logs/:id", protect, isAdmin, deleteLog);

// get all quizzes
router.get("/quizzes", protect, isAdmin, getQuizzes);
// get full quiz data
router.get("/quizzes/:id", protect, isAdmin, getFullQuiz);
// create quiz
// * this method creates only title, next you need add questions to quiz
router.post("/quizzes", protect, isAdmin, addQuiz);
// create a new question and add itot existing quiz
router.post("/quizzes/:id", protect, isAdmin, createAndAddQuestionToQuiz);
// delet quiz
router.delete("/quizzes/:id", protect, isAdmin, deleteQuiz);

// get question data by id
router.get("/questions/:id", protect, isAdmin, getQuestion);
// update existing question
router.put("/questions/:id", protect, isAdmin, updateQuestionData);
// delet question
router.delete("/questions/:id", protect, isAdmin, deleteQuestion);

module.exports = router;
