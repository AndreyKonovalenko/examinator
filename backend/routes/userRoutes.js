import express from "express";
import {
  login,
  getMe,
  registerUser,
  getUsers,
} from "./controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", login);
router.get("/me", protect, getMe);

// admin routes
router.get("/", protect, isAdmin, getUsers);

export default router;
