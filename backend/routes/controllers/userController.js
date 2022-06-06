import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public

const login = asyncHandler(async (req, res) => {
  res.status(200).json({ massage: 'Login User' })
})

// @desc Get user data
// @route GET /api/users/me
// @access Public

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ massage: 'User data display' })
})

export default { login, getMe }
