import express from 'express'
import { setLog, getLogs } from './controllers/logController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

// get all user logs
router.get('/', protect, getLogs)
// set new log
router.post('/', protect, setLog)

export default router
