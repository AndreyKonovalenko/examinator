import express from 'express';
import {
  getLogs,
  getUsers,
  deleteLog,
  deleteUser,
  getQuizzes,
  getFullQuiz,
  getQuestion,
  addQuiz,
  createAndAddQuestionToQuiz,
  updateQuestionData,
} from './controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

// get all user logs
router.get('/logs/user/:id', protect, isAdmin, getLogs);
// all users
router.get('/users', protect, isAdmin, getUsers);
// delete users
router.delete('/users/:id', protect, isAdmin, deleteUser);
// delete log by id
router.delete('/logs/:id', protect, isAdmin, deleteLog);
// get all quizzes
router.get('/quizzes', protect, isAdmin, getQuizzes);
// get full quiz data
router.get('/quizzes/:id', protect, isAdmin, getFullQuiz);
// get question data by id
router.get('/questions/:id', protect, isAdmin, getQuestion);
// create quiz
// * this method creates only title, next you need add questions to quiz
router.post('/quizzes', protect, isAdmin, addQuiz);
// create a new question and add itot existing quiz
router.post('/quizzes/:id', protect, isAdmin, createAndAddQuestionToQuiz);
// update existing question
router.put('/questions/:id', protect, isAdmin, updateQuestionData);

export default router;
