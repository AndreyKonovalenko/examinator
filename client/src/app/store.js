import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    quiz: quizReducer,
    auth: authReducer,
  },
});
