import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Error = () => {
  const quizState = useSelector((state) => state.quiz);
  const logState = useSelector((state) => state.log);
  const userState = useSelector((state) => state.auth);
  const adminState = useSelector((state) => state.admin);
  useEffect(() => {
    const errorList = [];
    if (userState.isError) {
      errorList.push(userState.message);
    }
    if (quizState.isError) {
      errorList.push(quizState.message);
    }
    if (logState.isError) {
      errorList.push(logState.message);
    }
    if (adminState.isError) {
      errorList.push(adminState.message);
    }
    if (errorList.length > 0) {
      console.log(errorList);
      const updatedErrorList = [...new Set(errorList)];
      console.log(updatedErrorList);
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
    adminState.isError,
    adminState.message,
  ]);

  return <ToastContainer />;
};

export default Error;
