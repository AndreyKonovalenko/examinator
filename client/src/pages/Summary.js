import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { Helmet } from 'react-helmet';
import Spinner from '../components/Spinner';
import Watermark from '../components/summary/Watermark.js';
import { Button } from '../components/styles/Button.styled.js';
import { Flex } from '../components/styles/Flex.styled.js';
import { StyledCertificate } from '../components/styles/Certificate.styled.js';
import { resetLogState } from '../features/log/logSlice';
import { resetQuizState } from '../features/quiz/quizSlice';
import { printDocument } from '../utils/createPDF';
import { scoreCulc } from '../utils/scoreCulc';
import { updatedAtParser } from '../utils/dateUtils';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.auth);
  const log = useSelector((state) => state.log.log);
  const { ru, en } = useSelector((state) => state.ui);
  const [data, setData] = useState({
    answers: [],
    title: '',
    name: '',
    updatedAt: '',
    result: '',
  });
  const { name, title, answers, updatedAt, result, threshold } = data;
  const etemptTime = updatedAtParser(updatedAt);
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
  }, [user, navigate, dispatch, log, en, ru]);

  const getPdf = () => {
    printDocument(log, { en, ru });
  };

  const tryAgaineHandler = () => {
    dispatch(resetLogState());
    dispatch(resetQuizState());
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
          <h1>
            {ru && 'Протокол'}
            {en && 'Quiz'}
          </h1>
          <h1>
            {ru && 'проверки знаний'}
            {en && 'result cirtificate'}
          </h1>
          <Watermark id={'pdfToPrintFirst'} n={3} />
          <h2>
            {ru && 'Тема:'}
            {en && 'Topic:'} {title}
          </h2>
          <h3>
            {ru && 'ФИО'}
            {en && 'Full name'}: {name}
          </h3>
          <h3>
            {ru && 'Дата/время проведения'}
            {en && 'Date/time'}: {etemptTime}
          </h3>
          <br />
          <h2>
            {ru && 'Результат'}
            {en && 'Score'}:
          </h2>
          <h2 style={scoreDependentStyle}>
            {ru &&
              `Тест ${
                score >= threshold ? 'пройден' : 'провален'
              } c результатом 
            ${score}%`}
            {en &&
              `You have ${score >= threshold ? 'succeeded' : 'failed'} with 
            ${score}%`}
          </h2>
          <p>
            {ru && `Правильных ответов: ${result} из ${answers.length}`}
            {en && `Correct answers: ${result} out of ${answers.length}`}
          </p>
          <Watermark id={'pdfToPrintSecond'} n={3} />
        </div>
        <Flex>
          <Button onClick={getPdf}>
            {ru && 'Сохранить в PDF'}
            {en && 'Save PDF'}{' '}
          </Button>
          <Button onClick={tryAgaineHandler}>
            {ru && 'Пройти заново'}
            {en && 'Try again'}
          </Button>
        </Flex>
      </StyledCertificate>
    </>
  );
  return !log ? <Spinner /> : summary;
};

export default Summary;
