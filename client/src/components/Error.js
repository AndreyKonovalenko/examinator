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
    if (userState.isError) {
      toast.error(userState.message);
    }
    if (quizState.isError) {
      toast.error(quizState.message);
    }
    if (logState.isError) {
      toast.error(logState.message);
    }
    if (adminState.isError) {
      toast.error(adminState.message);
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
