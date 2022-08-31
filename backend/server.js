import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import quizzesRouter from './routes/quizzesRoutes.js';
import path from 'path';
import usersRouter from './routes/usersRoutes.js';
import logsRouter from './routes/logsRoutes.js';
import questionsRouter from './routes/questionsRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/quizzes/', quizzesRouter);
app.use('/api/users/', usersRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/logs', logsRouter);
app.use('/api/admin', adminRouter);

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
