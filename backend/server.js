import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/quizRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use('/api/quiz/', router)

// app.get('/', (req, res) => res.status(200).json({ massage: 'API Running' }))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
