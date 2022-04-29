import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '../components/styles/Button.styled'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { loadQuiz, reset, writeLog } from '../features/quiz/quizSlice'
import Card from '../components/Card'
import data from '../__mocks__/questions'

export default function Quiz() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { quiz } = useSelector((state) => state.quiz)
  //Local state
  const [inProgress, setInProgress] = useState(false)

  const [qIndex, setQIndex] = useState(0)
  const [result, setResult] = useState(0)

  console.log(user)
  // Event handlers

  const onClickHundler = (id, event) => {
    event.preventDefault()
    if (qIndex < quiz.length - 1) {
      setQIndex(qIndex + 1)
    }

    dispatch(writeLog(id))
  }

  const tryAgain = (event) => {
    event.preventDefault()
    dispatch(reset())
    setQIndex(0)
    setInProgress(true)
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

  // Effect Hooks -----------------------------------------

  useEffect(() => {
    if (quiz === null) {
      dispatch(loadQuiz(data))
    }

    // setQuiz(shuffle(data));
    setInProgress(true)
  }, [quiz, qIndex])

  const resultField = (
    <>
      <h2>Ваш результат: {result}</h2>
      <Button onClick={tryAgain}>Повторить</Button>
      <Button>Пeчатоть результат</Button>
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
    </>
  )
}
