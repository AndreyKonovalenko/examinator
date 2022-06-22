import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/styles/Button.styled.js'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getQuizzes,
  resetQuizState,
  getQuizById,
} from '../features/quiz/quizSlice'
import { getLogs, resetLogState, setLog } from '../features/log/logSlice'
import QuizListCard from '../components/QuizListCard'
import LogListCard from '../components/LogListCard'
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
    if (!user) {
      dispatch(resetQuizState())
      dispatch(resetLogState())
      navigate('/login')
    }
    if (user && quizState.quiz && quizState.userAnswers.length > 0) {
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
  ])

  if (quizState.isLoading || logState.isLoading) {
    return <Spinner />
  }
  const summary = (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quiz | Examinator </title>
      </Helmet>
      <Button>Повторить</Button>
      <Button>Пeчатоть результат</Button>
      <h1>результат</h1>
    </>
  )
  return summary
}

export default Summary
