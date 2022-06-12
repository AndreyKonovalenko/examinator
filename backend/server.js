import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import quizRouter from './routes/quizRoutes.js';
import userRouter from './routes/userRoutes.js';
import logRouter from './routes/logRoutes.js';
import questionRouter from './routes/questionRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/quiz/', quizRouter);
app.use('/api/users/', userRouter);
app.use('/api/question', questionRouter);
app.use('/api/log', logRouter);

// app.get('/', (req, res) => res.status(200).json({ massage: 'API Running' }))
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
