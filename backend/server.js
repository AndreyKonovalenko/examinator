const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = requier('path');
const connectDB = requier('./config/db');
const quizzesRouter = requier('./routes/quizzesRoutes');
const usersRouter = requier('./routes/usersRoutes');
const logsRouter = requier('./routes/logsRoutes');
const questionsRouter = requier('./routes/questionsRoute');
const adminRouter = requier('./routes/adminRoutes');
const errorHandler = requier('./middleware/errorMiddleware');
// import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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
