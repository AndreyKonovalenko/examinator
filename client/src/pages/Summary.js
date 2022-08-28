import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import html2canvas from 'html2canvas';
import uniqid from 'uniqid';

import { Button } from '../components/styles/Button.styled.js';
import { Flex } from '../components/styles/Flex.styled.js';
import { Helmet } from 'react-helmet';
import { StyledCertificate } from '../components/styles/Certificate.styled.js';
import { StyledImage } from '../components/styles/Image.styled';
import { resetLogState, resetAnswersLogState } from '../features/log/logSlice';
import { resetQuizState } from '../features/quiz/quizSlice';
import logService from '../features/log/logService';
import Spinner from '../components/Spinner';
import theme from '../theme/index.js';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { log } = useSelector((state) => state.log);
  const { answers, title, updatedAt, result, name } = useSelector(
    (state) => state.log.log
  );

  const etemptTime = moment(updatedAt).format('DD.MM.YYYY/HH:mm:ss');
  const score = (
    (Number.parseInt(result) / Number.parseInt(answers.length)) *
    100
  ).toFixed(0);

  useEffect(() => {
    if (!user) {
      dispatch(resetQuizState());
      dispatch(resetLogState());
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  const printDocument = () => {
    if (log) {
      const doc = logService.createPDF(log);
      html2canvas(document.querySelector('#pdfToPrint')).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'JEPEG', 0, 50);
        html2canvas(document.querySelector('#pdfToPrint1')).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'JEPEG', 0, 155);
          doc.save(`${name} ${title}.pdf`);
        });
      });
    }
  };

  const getPdf = (event) => {
    event.preventDefault();
    printDocument();
  };

  const tryAgaineHandler = (event) => {
    event.preventDefault();
    dispatch(resetLogState());
    dispatch(resetAnswersLogState());
    navigate('/');
  };

  const images = (n) => {
    const styled = {
      listStyleType: 'none',
    };
    const result = [];
    let i = 0;
    while (i < n) {
      const custom = {
        transform: `rotate(${Math.floor(Math.random() * 180)}deg)`,
      };
      result.push(
        <li key={uniqid()} style={styled}>
          <StyledImage
            key={uniqid()}
            style={custom}
            src='/img/chaplain.png'
            alt=''
          />
        </li>
      );
      i++;
    }
    return result;
  };
  const succes = {
    color: theme.colors.primary.light,
  };
  const fail = {
    color: theme.colors.error,
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
          <h1>проверки знаний работников</h1>
          <Flex id={'pdfToPrint'}>{images(3)}</Flex>
          <h2>Тема: {title}</h2>
          <h3>ФИО: {name}</h3>
          <h3>Дата/время проведения: {etemptTime} </h3>
          <br />
          <h2>Результат:</h2>
          <h2 style={score >= 80 ? succes : fail}>
            Тест {score >= 80 ? 'пройден' : 'провален'} с результатом {score}%
          </h2>
          <p>
            Правильных ответов: {result} из {answers.length}
          </p>
          <Flex id={'pdfToPrint1'}>{images(3)}</Flex>
        </div>
        <Flex>
          <Button onClick={getPdf}>Сохранить в PDF </Button>
          <Button onClick={tryAgaineHandler}>Пройти заново</Button>
        </Flex>
      </StyledCertificate>
    </>
  );

  if (!log) {
    return <Spinner />;
  }

  return summary;
};

export default Summary;
