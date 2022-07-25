import express from "express";
import isAdmin from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js";

import { login, getMe, registerUser } from "./controllers/userController.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
