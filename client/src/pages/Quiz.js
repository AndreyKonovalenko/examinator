import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../components/styles/Button.styled';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import shuffle from '../features/quiz/quizService';
import data from '../__mocks__/questions';

const Quiz = () => {
  //Local state
  const [inProgress, setInProgress] = useState(false);
  const [quiz, setQuiz] = useState(undefined);
  const [qIndex, setQIndex] = useState(0);
  const [log, setLog] = useState([]);
  const [result, setResult] = useState(0);
  console.log(quiz);

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  // Event handlers

  const onClickHundler = (event) => {
    event.preventDefault();
    if (qIndex < quiz.length - 1) {
      setQIndex(qIndex + 1);
    }
    if (qIndex === quiz.length - 1) {
      calculator(quiz, log);
      setInProgress(false);
    }
    setLog((oldState) => [...oldState, event.target.innerText]);
    console.log('clicked', qIndex);
  };

  const tryAgain = (event) => {
    event.preventDefault();
    setQIndex(0);
    setResult(0);
    setQuiz(shuffle(data));
    setInProgress(true);
  };
  // utils
  const calculator = (data, log) => {
    let result = 0;
    data.forEach((element, index) => {
      //  console.log(element.answer, element.id);
      if (element.answer === log[index]) {
        result++;
      }
    });
    setResult(result);
  };

  // Effect Hooks -----------------------------------------

  useEffect(() => {
    setQuiz(shuffle(data));
    setInProgress(true);
  }, [quiz, qIndex]);

  const resultField = (
    <>
      <h2>Ваш результат: {result}</h2>
      <Button onClick={tryAgain}>Повторить</Button>
      <Button>Пeчатоть результат</Button>
    </>
  );

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Quiz | Examinator </title>
      </Helmet>
      <h1>Quiz Page</h1>
      {quiz !== undefined && inProgress === true ? (
        <Card item={quiz[qIndex]} onClick={onClickHundler} />
      ) : null}

      {inProgress === true ? null : resultField}
    </>
  );
};

export default Quiz;
