import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizSlice";
import authReducer from "../features/auth/authSlice";
import logReducer from "../features/log/logSlice";
import adminReducer from "../features/admin/adminSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    quiz: quizReducer,
    log: logReducer,
  },
});
