const express = require("express");

const { login, registerUser } = require("./controllers/usersController");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", login);
//router.get("/me", protect, getMe);
module.exports = router;
