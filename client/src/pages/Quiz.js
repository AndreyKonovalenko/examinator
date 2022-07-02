import React from 'react';
import Spinner from '../components/Spinner.js';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import quizService from '../features/quiz/quizService';

import {
  resetQuizState,
  setUserAnswer,
  finishQuiz,
} from '../features/quiz/quizSlice';
import { setLog } from '../features/log/logSlice.js';
import Card from '../components/Card';
import { useNavigate } from 'react-router';

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const quizState = useSelector((state) => state.quiz);
  const logState = useSelector((state) => state.log);
  const [qIndex, setQIndex] = useState(0);
  const [quesitonsShuffled, setQuestionsShuffled] = useState(null);

  useEffect(() => {
    if (!user) {
      dispatch(resetQuizState());
      navigate('/login');
    }
    if (quizState.quiz !== null && quesitonsShuffled === null) {
      const data = quizService.shuffle(quizState.quiz.questions);
      setQuestionsShuffled(data);
    }
    if (user && quizState.quiz === null && !quizState.isLoading) {
      toast.error('Вы приравли тесет, начните заново!');
      navigate('/');
    }
    if (quizState.isCompleted) {
      dispatch(
        setLog({ quizId: quizState.quiz._id, answers: quizState.userAnswers })
      );
      navigate('/summary');
    }
  }, [
    user,
    navigate,
    dispatch,
    quizState.userAnswers.length,
    logState.isSuccess,
    quesitonsShuffled,
    quizState.quiz,
    quizState.isLoading,
    quizState.isCompleted,
    quizState.userAnswers,
  ]);

  const onClickHundler = (args, event) => {
    event.preventDefault();
    if (qIndex < quizState.quiz.questions.length - 1) {
      dispatch(setUserAnswer({ qId: args[1], answer: [args[0]] }));
      setQIndex(qIndex + 1);
    }
    if (qIndex === quizState.quiz.questions.length - 1) {
      dispatch(setUserAnswer({ qId: args[1], answer: [args[0]] }));
      dispatch(finishQuiz());
    }
  };

  if (quizState.isLoading || logState.isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Quiz | Examinator </title>
      </Helmet>
      {quizState.quiz && quesitonsShuffled ? (
        <Card
          item={quesitonsShuffled[qIndex]}
          status={`${qIndex + 1}/${quizState.quiz.questions.length}`}
          onClick={onClickHundler}
        />
      ) : null}
    </>
  );
};

export default Quiz;
