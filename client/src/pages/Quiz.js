import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '../components/styles/Button.styled'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadQuiz,
  reset,
  writeLog,
  getResult,
} from '../features/quiz/quizSlice'
import Card from '../components/Card'
import Certificate from '../components/Certificate'
import data from '../__mocks__/questions'

export default function Quiz() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { quiz } = useSelector((state) => state.quiz)
  const { result } = useSelector((state) => state.quiz)
  // const { inProgress } = useSelector((state) => state.inProgress)

  const [inProgress, setInProgress] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  // const [result, setResult] = useState(0)

  console.log(user)
  // Event handlers

  const onClickHundler = (id, event) => {
    event.preventDefault()
    if (qIndex < quiz.length - 1) {
      setQIndex(qIndex + 1)
    }
    if (qIndex == quiz.length - 1) {
      setInProgress(false)
      dispatch(getResult())
      // need calculate result action here!!!
    }
    dispatch(writeLog(id))
  }

  const tryAgain = (event) => {
    event.preventDefault()
    dispatch(reset())
    setQIndex(0)
    setInProgress(false)
  }
  // utils
  //   const calculator = (data, log) => {
  //     let result = 0
  //     data.forEach((element, index) => {
  //       //  console.log(element.answer, element.id);
  //       if (element.answer === log[index]) {
  //         result++
  //       }
  //     })
  //     setResult(result)
  //   }
  const getPdf = (event) => {
    event.preventDefault()
    setPdf(true)
  }

  // Effect Hooks -----------------------------------------

  useEffect(() => {
    if (quiz === null) {
      dispatch(loadQuiz(data))
      setInProgress(true)
    }
    // setQuiz(shuffle(data));
  }, [quiz, qIndex])

  const resultField = (
    <>
      <h2>
        Правленых ответов:{' '}
        {quiz != null ? `${((result / quiz.length) * 100).toFixed(0)} %` : null}
      </h2>
      <Button onClick={tryAgain}>Повторить</Button>
      <Button onClick={setPdf}>Пeчатоть результат</Button>
    </>
  )

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quiz | Examinator </title>
      </Helmet>
      <h1>Quiz Page</h1>
      {quiz !== null && inProgress === true ? (
        <Card item={quiz[qIndex]} onClick={onClickHundler} />
      ) : null}
      {inProgress === true ? null : resultField}
      {pdf ? <Certificate /> : null}
    </>
  )
}
