const express = require("express");
const { getQuizzes, getQuiz } = require("./controllers/quizzesController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// get all quizzes

router.get("/", protect, getQuizzes);
// get quiz by id, don't have logic yet
router.get("/:id", protect, getQuiz);

module.exports = router;
