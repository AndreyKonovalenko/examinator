import express from "express";
import { getLogs, getUsers } from "./controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";
const router = express.Router();

// get all user logs
router.get("/logs/user/:id", protect, isAdmin, getLogs);

// all users
router.get("/users", protect, isAdmin, getUsers);
export default router;
