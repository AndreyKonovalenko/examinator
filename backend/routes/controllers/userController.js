import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../../models/userModel.js'

// @desc Register new user

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password, admin } = req.body
  if (!name || !username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const userExists = await User.findOne({ username })
  if (userExists) {
    res.status(400)
    throw Error('User already exsits')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await User.create({
    name,
    username,
    password: hashedPassword,
    admin,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      admin: user.admin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get user data
// @route GET /api/users/me
// @access Privet

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}
