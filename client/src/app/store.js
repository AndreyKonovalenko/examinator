import { configureStore } from '@reduxjs/toolkit'
import quizReducer from '../features/quiz/quizSlice'
import authReducer from '../features/auth/authSlice'
import logReducer from '../features/log/logSlice'
import uiReducer from '../features/ui/uiSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    log: logReducer,
    ui: uiReducer,
  },
})
