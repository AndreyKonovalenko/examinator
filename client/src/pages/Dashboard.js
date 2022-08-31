import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';

import QuizListCard from '../components/dashboard/QuizListCard';
import LogListCard from '../components/dashboard/LogListCard';
import Spinner from '../components/Spinner';

import { getQuizzes, getQuizById } from '../features/quiz/quizSlice';
import { getLogs, getLogById } from '../features/log/logSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ru, en } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const { quizzes, isLodaidng: quizIsLoading } = useSelector(
    (state) => state.quiz
  );
  const { logs, isLodaidng: logIsLoading } = useSelector((state) => state.log);

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

  if (quizIsLoading || logIsLoading) {
    return <Spinner />;
  }
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
  return dashboard;
};

export default Dashboard;
