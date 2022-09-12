const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  setQuestion,
  getQuestions,
} = require('./controllers/questionsController');

const router = express.Router();

// get all quetions
router.get('/', protect, getQuestions);
// set new question
router.post('/', protect, setQuestion);

module.exports = router;
