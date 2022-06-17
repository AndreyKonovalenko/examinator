import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getQuizzes, reset } from '../features/quiz/quizSlice'
import QuizListCard from '../components/QuizListCard'
import Spinner from '../components/Spinner'
import Error from '../components/Error'
const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { quizzes, isLoading, isError, message } = useSelector(
    (state) => state.quiz,
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!user) {
      dispatch(reset())
      navigate('/login')
    } else {
      dispatch(getQuizzes())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const dashboard = (
    <>
      <Error />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Examinator</title>
      </Helmet>

      {quizzes.length !== 0 && user ? (
        <QuizListCard user={user.name} item={quizzes} />
      ) : null}
      <h3>Статистика:</h3>
    </>
  )
  return dashboard
}

export default Dashboard
