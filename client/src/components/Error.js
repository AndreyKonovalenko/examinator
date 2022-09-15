import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Error = () => {
  const quizState = useSelector((state) => state.quiz);
  const quizzesState = useSelector((state) => state.quizzes);
  const logState = useSelector((state) => state.log);
  const logsState = useSelector((state) => state.logs);
  const userState = useSelector((state) => state.auth);
  const adminUsersState = useSelector((state) => state.adminUsers);
  const adminQuizState = useSelector((state) => state.adminQuiz);
  const adminQuizzesState = useSelector((stete) => stete.adminQuizzes);
  const adminLogsState = useSelector((state) => state.adminLogs);
  const adminQuestionState = useSelector((state) => state.adminQuestion);

  useEffect(() => {
    const errorList = [];
    if (userState.isError) {
      errorList.push(userState.message);
    }
    if (quizState.isError) {
      errorList.push(quizState.message);
    }
    if (quizzesState.isError) {
      errorList.push(quizzesState.message);
    }
    if (logState.isError) {
      errorList.push(logState.message);
    }
    if (logsState.isError) {
      errorList.push(logsState.message);
    }
    if (adminUsersState.isError) {
      errorList.push(adminUsersState.message);
    }
    if (adminQuizState.isError) {
      errorList.push(adminQuizState.message);
    }
    if (adminQuizzesState.isError) {
      errorList.push(adminQuizzesState.message);
    }
    if (adminLogsState.isError) {
      errorList.push(adminLogsState.message);
    }
    if (adminQuestionState.isError) {
      errorList.push(adminQuestionState.message);
    }

    if (errorList.length > 0) {
      const updatedErrorList = [...new Set(errorList)];
      updatedErrorList.forEach((element) => {
        toast.error(element);
      });
    }
  }, [
    quizState.isError,
    quizState.message,
    logState.isError,
    logState.message,
    userState.isError,
    userState.message,
    adminQuizState.isError,
    adminQuizState.message,
    quizzesState.isError,
    quizzesState.message,
    logsState.isError,
    logsState.message,
    adminUsersState.isError,
    adminUsersState.message,
    adminQuizzesState.isError,
    adminQuizzesState.message,
    adminLogsState.isError,
    adminLogsState.message,
    adminQuestionState.isError,
    adminQuestionState.message,
  ]);

  return <ToastContainer />;
};

export default Error;
