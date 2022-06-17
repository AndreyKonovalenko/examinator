import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getQuizzes, resetQuizState } from '../features/quiz/quizSlice'
import { getLogs, resetLogState } from '../features/log/logSlice'
import QuizListCard from '../components/QuizListCard'
import LogListCard from '../components/LogListCard'
import Spinner from '../components/Spinner'
import Error from '../components/Error'
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
    } else {
      dispatch(getQuizzes())
      dispatch(getLogs())
    }
  }, [user, navigate, quizState.isError, quizState.message, dispatch])

  if (quizState.isLoading || logState.isLoading) {
    return <Spinner />
  }
  const dashboard = (
    <>
      <Error />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Examinator</title>
      </Helmet>

      {quizState.quizzes.length !== 0 && user ? (
        <QuizListCard user={user.name} item={quizState.quizzes} />
      ) : null}
      {logState.logs.length !== 0 && user ? (
        <LogListCard item={logState.logs} />
      ) : null}
    </>
  )
  return dashboard
}

export default Dashboard
