const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw Error('User already exsits');
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const user = await User.create({
    name,
    username,
    password: hashedPassword,
    admin: false,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      admin: user.admin,
      name: user.name,
      token: generateToken(user._id),
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log(password, user.password);
    res.json({
      _id: user.id,
      admin: user.admin,
      name: user.name,
      token: generateToken(user._id),
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Get user data
// @route PUT /api/users/reset-password
// @access Privet

const resetUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  // Hash password
  const user = await User.findOne({ _id: req.user.id });
  if (user && (await bcrypt.compare(currentPassword, user.password))) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // get user id from user (auth middleware)
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    if (updatedUser) {
      res.status(201).json({
        _id: updatedUser.id,
        admin: updatedUser.admin,
        name: updatedUser.name,
        token: generateToken(updatedUser._id),
        username: updatedUser.username,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } else {
    res.status(400);
    throw new Error('Invalid user current password');
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Privet

// export const getMe = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user);
// });

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};

// need to implament refrash- token logic
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user?.id, isAdmin: user?.isAdmin },
    process.env.JWT_REFRESH_SECRET
  );
};

module.exports = { registerUser, login, resetUserPassword };
