import express from 'express'
import controller from './controllers/userController.js'
const router = express.Router()
const { login, getMe, registerUser } = controller
// get all quizzes
router.post('/', registerUser)
router.post('/login', login)
router.get('/me', getMe)

export default router
