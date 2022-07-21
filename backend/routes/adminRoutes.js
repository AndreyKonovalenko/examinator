import express from "express";
import {
  getLogs,
  getUsers,
  deleteLog,
  deleteUser,
  getQuizzes,
} from "./controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";
const router = express.Router();

// get all user logs
router.get("/logs/user/:id", protect, isAdmin, getLogs);
// all users
router.get("/users", protect, isAdmin, getUsers);
// delete users
router.delete("/users/:id", protect, isAdmin, deleteUser);
// delete log by id
router.delete("/logs/:id", protect, isAdmin, deleteLog);
// get all quizzes
router.get("/quizzes", protect, isAdmin, getQuizzes);

export default router;
