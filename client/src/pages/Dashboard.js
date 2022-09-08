import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';

import QuizListCard from '../components/dashboard/QuizListCard';
import LogListCard from '../components/dashboard/LogListCard';
import Spinner from '../components/Spinner';

import { getQuizById } from '../features/quiz/quizSlice';
import { getQuizzes } from '../features/quizzes/quizzesSlice';
import { getLogById } from '../features/log/logSlice';
import { getLogs } from '../features/logs/logsSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ru, en } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const { quizzes, isLoading: quizzesIsLoading } = useSelector(
    (state) => state.quizzes
  );
  const { logs, isLoading: logsIsLoading } = useSelector((state) => state.logs);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user) {
      dispatch(getQuizzes());
      dispatch(getLogs());
    }
  }, [dispatch, navigate, user]);

  const onQuizSelect = (id) => {
    if (id) {
      dispatch(getQuizById(id));
      navigate('/quiz');
    }
  };

  const onLogHandler = (log) => {
    dispatch(getLogById(log._id));
    navigate('/summary');
  };

  const dashboard = (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Dashboard | Examinator</title>
      </Helmet>

      {quizzes && user ? (
        <QuizListCard
          ru={ru}
          en={en}
          user={user.name}
          item={quizzes}
          onClick={onQuizSelect}
        />
      ) : null}
      {logs && user ? (
        <LogListCard ru={ru} en={en} onClick={onLogHandler} item={logs} />
      ) : null}
    </>
  );

  return quizzesIsLoading || logsIsLoading ? <Spinner /> : dashboard;
};

export default Dashboard;
