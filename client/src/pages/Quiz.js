import React from 'react'
import Spinner from '../components/Spinner.js'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import quizService from '../features/quiz/quizService'

import { resetQuizState, setUserAnswer } from '../features/quiz/quizSlice'
import { setLog } from '../features/log/logSlice'
import Card from '../components/Card'
import { useNavigate } from 'react-router'

const Quiz = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const quizState = useSelector((state) => state.quiz)
  const logState = useSelector((state) => state.log)
  const { modal } = useSelector((state) => state.ui)
  const [qIndex, setQIndex] = useState(0)
  const [quesitonsShuffled, setQuestionsShuffled] = useState(null)

  useEffect(() => {
    if (quizState.isError) {
      toast.error(quizState.message)
    }
    if (logState.isError) {
      toast.error(logState.message)
    }
    if (!user) {
      dispatch(resetQuizState())
      navigate('/login')
    }
    if (quizState.quiz !== null && quesitonsShuffled === null) {
      const data = quizService.shuffle(quizState.quiz.questions)
      setQuestionsShuffled(data)
    }
    if (user && quizState.quiz === null && !quizState.isLoading) {
      toast.error('Вы приравли тесет, начните заново!')
      navigate('/')
    }
    // if (quizState.userAnswers.length > 0 && logState.isSuccess) {
    //   navigate('/');
    // }
  }, [
    user,
    navigate,
    dispatch,
    quizState.message,
    quizState.isError,
    quizState.quiz,
    quizState.isLoading,
    logState.isError,
    logState.message,
    quizState.userAnswers.length,
    logState.isSuccess,
    quesitonsShuffled,
  ])

  const onClickHundler = (args, event) => {
    event.preventDefault()
    if (qIndex < quizState.quiz.questions.length - 1) {
      dispatch(setUserAnswer({ qId: args[1], answer: [args[0]] }))
      setQIndex(qIndex + 1)
    }
    if (qIndex === quizState.quiz.questions.length - 1) {
      dispatch(setUserAnswer({ qId: args[1], answer: [args[0]] }))
      navigate('/summary')
    }
  }

  if (quizState.isLoading || logState.isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quiz | Examinator </title>
      </Helmet>
      {quizState.quiz !== null && quesitonsShuffled !== null ? (
        <Card item={quesitonsShuffled[qIndex]} onClick={onClickHundler} />
      ) : null}
    </>
  )
}

export default Quiz
