import React from 'react'
import Spinner from '../components/Spinner.js'
import Error from '../components/Error.js'
import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '../components/styles/Button.styled'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { StyledImage } from './../components/styles/Image.styled'
import { StyledCertificate } from '../components/styles/Certificate.styled'
import quizService from '../features/quiz/quizService'

import {
  loadQuiz,
  writeLog,
  getResult,
  resetQuizState,
  setUserAnswer,
} from '../features/quiz/quizSlice'
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
    if (quizState.userAnswers.length > 0 && logState.isSuccess) {
      navigate('/')
    }
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
  ])

  const onClickHundler = (args, event) => {
    event.preventDefault()
    if (qIndex === quizState.quiz.questions.length - 1) {
      event.stopPropagation()
    }

    console.log(qIndex)
    console.log(args)
    dispatch(setUserAnswer({ qId: args[1], answer: [args[0]] }))

    if (qIndex < quizState.quiz.questions.length - 1) {
      setQIndex(qIndex + 1)
    }

    // navigate('/summary')
    // setInProgress(false)
    // dispatch(getResult())
    // need calculate result action here!!!
  }

  // const tryAgain = (event) => {
  //   event.preventDefault()
  //   setQIndex(0)
  //   setInProgress(false)
  // }
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

  // const printDocument = () => {
  //   html2canvas(document.querySelector('#pdfToPrint')).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png')
  //     const pdf = new jsPDF()
  //     pdf.addImage(imgData, 'JPEG', 20, 20)
  //     pdf.save('download.pdf')
  //   })
  // }

  // const getPdf = (event) => {
  //   event.preventDefault()
  //   printDocument()
  //   //  dispatch(modalSwitch(true))
  // }

  // Effect Hooks -----------------------------------------

  // useEffect(() => {
  //   if (quiz === null) {
  //     setInProgress(true);
  //   }
  //   // setQuiz(shuffle(data));
  // }, [quiz, qIndex, dispatch]);

  // const images = (n) => {
  //   const result = []
  //   let i = 0
  //   while (i < n) {
  //     const custom = {
  //       transform: `rotate(${Math.floor(Math.random() * 180)}deg)`,
  //     }
  //     result.push(<StyledImage style={custom} src="/img/chaplain.png" alt="" />)
  //     i++
  //   }
  //   return result
  // }
  // const parent = {
  //   position: 'relateive',
  // }
  // const child1 = {
  //   position: 'absolute',
  //   width: '768px',
  // }
  // const child2 = {
  //   zIndex: '3',
  // }
  // const resultField = (
  //   <>
  //     <Button onClick={tryAgain}>Повторить</Button>
  //     <Button onClick={getPdf} disabled={modal ? 'true' : null}>
  //       Пeчатоть результат
  //     </Button>
  //     <div id={'pdfToPrint'}>
  //       <div style={parent}>
  //         <div style={child1}>{images(30)}</div>
  //         <div style={child2}>
  //           <h2>Уважаемый {user.name}</h2>
  //           {result >= 80 ? (
  //             <h2>Тест пройдн успешно </h2>
  //           ) : (
  //             <h2>Тест провален</h2>
  //           )}
  //           <p>{new Date().toLocaleString() + ''}</p>
  //           <p>
  //             Правленых ответов:{' '}
  //             {quiz !== null
  //               ? `${((result / quiz.length) * 100).toFixed(0)} %`
  //               : null}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // )

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
