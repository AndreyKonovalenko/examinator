import { configureStore } from '@reduxjs/toolkit'
import quizReducer from '../features/quiz/quizSlice'
import authReducer from '../features/auth/authSlice'
import uiReducer from '../features/ui/uiSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    ui: uiReducer,
  },
})
