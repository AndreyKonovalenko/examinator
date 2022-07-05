import express from "express";
import { login, getMe } from "./controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

// get all quizzes
//router.post('/', registerUser);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
