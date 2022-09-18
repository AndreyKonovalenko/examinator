const express = require('express');

const {
  login,
  registerUser,
  resetUserPassword,
} = require('./controllers/usersController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.post('/login', login);
router.put('/reset-password', protect, resetUserPassword);
//router.get("/me", protect, getMe);
module.exports = router;
