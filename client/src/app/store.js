import { configureStore } from '@reduxjs/toolkit';

import adminUsersReducer from '../features/adminUsers/adminUsersSlice';
import adminLogsReducer from '../features/adminLogs/adminLogsSlice';
import adminFullUserLogReducer from '../features/adminFullUserLog/adminFullUserLogSlice';
import adminQuestionReducer from '../features/adminQuestion/adminQuiestionSlice';
import adminQuizReducer from '../features/adminQuiz/adminQuizSlice';
import adminQuizzesReducer from '../features/adminQuizzes/adminQuizzesSlice';
import authReducer from '../features/auth/authSlice';
import logReducer from '../features/log/logSlice';
import logsReducer from '../features/logs/logsSlice';
import quizReducer from '../features/quiz/quizSlice';
import quizzesReducer from '../features/quizzes/quizzesSlice';
import uiReducer from '../features/ui/uiSlice';

export default configureStore({
  reducer: {
    adminUsers: adminUsersReducer,
    adminLogs: adminLogsReducer,
    adminFullUserLog: adminFullUserLogReducer,
    adminQuestion: adminQuestionReducer,
    adminQuiz: adminQuizReducer,
    adminQuizzes: adminQuizzesReducer,
    auth: authReducer,
    quiz: quizReducer,
    quizzes: quizzesReducer,
    log: logReducer,
    logs: logsReducer,
    ui: uiReducer,
  },
});
