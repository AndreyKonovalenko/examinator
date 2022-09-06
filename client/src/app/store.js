import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";
import authReducer from "../features/auth/authSlice";
import logReducer from "../features/log/logSlice";
import adminReducer from "../features/admin/adminSlice";
import uiReducer from "../features/ui/uiSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    quiz: quizReducer,
    quizzes: quizzesReducer,
    log: logReducer,
    ui: uiReducer,
  },
});
