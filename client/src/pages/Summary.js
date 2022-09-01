import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import Spinner from '../components/Spinner';
import Watermark from '../components/summary/Watermark.js';
import { Button } from '../components/styles/Button.styled.js';
import { Flex } from '../components/styles/Flex.styled.js';
import { Helmet } from 'react-helmet';
import { StyledCertificate } from '../components/styles/Certificate.styled.js';
import { resetLogState, resetAnswersLogState } from '../features/log/logSlice';
import { resetQuizState } from '../features/quiz/quizSlice';
import { printDocument } from '../utils/createPDF';
import { scoreCulc } from '../utils/scoreCulc';
import { updatedAtPareser } from '../utils/dateUtils';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.auth);
  const log = useSelector((state) => state.log.log);
  const [data, setData] = useState({
    answers: [],
    title: '',
    name: '',
    updatedAt: '',
    result: '',
  });
  const { name, title, answers, updatedAt, result } = data;
  const etemptTime = updatedAtPareser(updatedAt);
  const score = scoreCulc(result, answers);
  const scoreDependentStyle = {
    color: score >= 80 ? theme.colors.primary.light : theme.colors.error,
  };

  useEffect(() => {
    if (!user) {
      dispatch(resetQuizState());
      dispatch(resetLogState());
      navigate('/login');
    }
    if (log) {
      setData(log);
    }
  }, [user, navigate, dispatch, log]);

  const getPdf = () => {
    printDocument(log);
  };

  const tryAgaineHandler = () => {
    dispatch(resetLogState());
    dispatch(resetAnswersLogState());
    navigate('/');
  };

  const summary = (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Quiz | Examinator </title>
      </Helmet>
      <StyledCertificate>
        <div>
          <h1>Протокол</h1>
          <h1>проверки знаний</h1>
          <Watermark id={'pdfToPrintFirst'} n={3} />
          <h2>Тема: {title}</h2>
          <h3>ФИО: {name}</h3>
          <h3>Дата/время проведения: {etemptTime} </h3>
          <br />
          <h2>Результат:</h2>
          <h2 style={scoreDependentStyle}>
            Тест {score >= 80 ? 'пройден' : 'провален'} с результатом {score}%
          </h2>
          <p>
            Правильных ответов: {result} из {answers.length}
          </p>
          <Watermark id={'pdfToPrintSecond'} n={3} />
        </div>
        <Flex>
          <Button onClick={getPdf}>Сохранить в PDF </Button>
          <Button onClick={tryAgaineHandler}>Пройти заново</Button>
        </Flex>
      </StyledCertificate>
    </>
  );
  return !log ? <Spinner /> : summary;
};

export default Summary;
