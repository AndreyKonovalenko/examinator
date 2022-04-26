import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../components/styles/Button.styled';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { loadQuiz } from '../features/quiz/quizSlice';
import Card from '../components/Card';
import shuffle from '../features/quiz/quizService';
import data from '../__mocks__/questions';


export default function Quiz() {
  const dispatch = useDispatch();
  //Local state
  const [inProgress, setInProgress] = useState(false);
  const [quiz, setQuiz] = useState(undefined);
  const [qIndex, setQIndex] = useState(0);
  const [log, setLog] = useState([]);
  const [result, setResult] = useState(0);
  

  const { user } = useSelector(state => state.auth);
  const quizT = useSelector(state => state.quiz);

  console.log(user);
  console.log(quizT.quiz,"quizT");
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
  const onClickHundler2 = event => {
    event.preventDefault();
    dispatch(loadQuiz(data));
  }

  

  // Effect Hooks -----------------------------------------

  useEffect(() => {
    //dispatch(loadQuiz(data));
   // setQuiz(shuffle(data));
    setInProgress(true);
  }, [quiz, qIndex, quizT]);

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
      <Button onClick={onClickHundler2}>loadQuiz</Button>
      <h1>Quiz Page</h1>
      {quizT.quiz !== undefined && inProgress === true ? (
        <Card item={quizT.quiz[qIndex]} onClick={onClickHundler} />
      ) : null}

      {inProgress === true ? null : resultField}
    </>
  );
}
