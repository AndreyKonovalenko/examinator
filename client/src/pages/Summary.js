import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/styles/Button.styled.js'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { resetQuizState } from '../features/quiz/quizSlice'
import { resetLogState, setLog } from '../features/log/logSlice'

import Spinner from '../components/Spinner'

const Summary = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const quizState = useSelector((state) => state.quiz)
  const logState = useSelector((state) => state.log)

  useEffect(() => {
    if (quizState.isError) {
      toast.error(quizState.message)
    }
    if (logState.isError) {
      toast.error(logState.message)
    }
    if (quizState.quiz === null) {
      toast.error('Вы покинули страницу результата теста')
    }
    if (!user || quizState.quiz === null) {
      dispatch(resetQuizState())
      dispatch(resetLogState())
      navigate('/login')
    }
    if (user && quizState.quiz !== null && quizState.userAnswers.length > 0) {
      dispatch(
        setLog({ quizId: quizState.quiz._id, answers: quizState.userAnswers }),
      )
    }
  }, [
    user,
    navigate,
    dispatch,
    quizState.isError,
    logState.isError,
    quizState.message,
    logState.message,
    quizState.quiz,
    quizState.userAnswers,
  ])

  const culcSummry = (event) => {
    event.preventDefault()
    dispatch(
      setLog({ quizId: quizState.quiz._id, answers: quizState.userAnswers }),
    )
  }

  if (quizState.isLoading || logState.isLoading) {
    return <Spinner />
  }
  const summary = (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quiz | Examinator </title>
      </Helmet>
      <Button onClick={culcSummry}>Рассчитать результат повторно</Button>
      <Button>Пeчатоть результат </Button>
      <h1>результат</h1>
      <p>
        {logState.isSuccess
          ? logState.logs[logState.logs.length - 1].result
          : null}
      </p>
    </>
  )
  return summary
}

export default Summary
