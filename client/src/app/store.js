import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import adminUsersReducer from "../features/adminUsers/adminUsersSlice";
import authReducer from "../features/auth/authSlice";
import logReducer from "../features/log/logSlice";
import logsReducer from "../features/logs/logsSlice";
import quizReducer from "../features/quiz/quizSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";
import uiReducer from "../features/ui/uiSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
    adminUsers: adminUsersReducer,
    auth: authReducer,
    quiz: quizReducer,
    quizzes: quizzesReducer,
    log: logReducer,
    logs: logsReducer,
    ui: uiReducer,
  },
});
