import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import quizRouter from './routes/quizRoutes.js';
import path from 'path';
import userRouter from './routes/userRoutes.js';
import logRouter from './routes/logRoutes.js';
import questionRouter from './routes/questionRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/quiz/', quizRouter);
app.use('/api/users/', userRouter);
app.use('/api/question', questionRouter);
app.use('/api/log', logRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
