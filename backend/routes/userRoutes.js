import express from 'express'
import controller from './controllers/userController.js'
const router = express.Router()
const { login, getMe } = controller
// get all quizzes
router.post('/login', login)
router.post('/me', getMe)

export default router
