import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getQuizzes,
  resetQuizState,
  getQuizById,
} from '../features/quiz/quizSlice'
import { getLogs, resetLogState, getLogById } from '../features/log/logSlice'
import QuizListCard from '../components/QuizListCard'
import LogListCard from '../components/LogListCard'
import Spinner from '../components/Spinner'
const Dashboard = () => {
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
    if (user) {
      dispatch(getQuizzes())
      dispatch(getLogs())
    }
  }, [
    user,
    navigate,
    quizState.isError,
    logState.isError,
    quizState.message,
    logState.message,
    dispatch,
  ])

  const onQuizSelect = (id, event) => {
    event.preventDefault()
    if (id) {
      dispatch(getQuizById(id))
      navigate('/quiz')
    }
  }

  const onLogHandler = (log, event) => {
    event.preventDefault()
    dispatch(getLogById(log._id))
    dispatch(getQuizById(log.quiz._id))
    navigate('/summary')
  }

  if (quizState.isLoading || logState.isLoading) {
    return <Spinner />
  }
  const dashboard = (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Examinator</title>
      </Helmet>

      {quizState.quizzes.length > 0 && user ? (
        <QuizListCard
          user={user.name}
          item={quizState.quizzes}
          onClick={onQuizSelect}
        />
      ) : null}
      {logState.logs.length > 0 && user ? (
        <LogListCard onClick={onLogHandler} item={logState.logs} />
      ) : null}
    </>
  )
  return dashboard
}

export default Dashboard
