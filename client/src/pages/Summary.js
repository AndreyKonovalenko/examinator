import React from 'react'
import moment from 'moment'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/styles/Button.styled.js'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { StyledCertificate } from '../components/styles/Certificate.styled.js'
import { StyledImage } from '../components/styles/Image.styled'
import { toast } from 'react-toastify'
import { resetQuizState } from '../features/quiz/quizSlice'
import { resetLogState, setLog } from '../features/log/logSlice'
import { Flex } from '../components/styles/Flex.styled.js'
import theme from '../theme/index.js'
import uniqid from 'uniqid'
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
      console.log('quiz=null')
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

  const printDocument = () => {
    html2canvas(document.querySelector('#pdfToPrint')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 'JPEG', 0, 30)
      pdf.save('download.pdf')
    })
  }

  const getPdf = (event) => {
    event.preventDefault()
    printDocument()
  }

  if (quizState.isLoading || logState.isLoading) {
    return <Spinner />
  }

  let etemptResult = null
  let etemptTime = null
  let etemptQuizeTitle = null
  let score = null
  let amount = null

  if (logState.isSuccess && quizState.quiz !== null && logState.log !== null) {
    const { result, updatedAt } = logState.log
    console.log(result)
    etemptResult = result
    etemptTime = moment(updatedAt).format('DD.MM.YYYY HH:mm:ss')
    etemptQuizeTitle = quizState.quiz.title
    amount = quizState.quiz.questions.length
    score = (
      (Number.parseInt(etemptResult) / Number.parseInt(amount)) *
      100
    ).toFixed(0)
  }

  const images = (n) => {
    const styled = {
      listStyleType: 'none',
    }
    const result = []
    let i = 0
    while (i < n) {
      const custom = {
        transform: `rotate(${Math.floor(Math.random() * 180)}deg)`,
      }
      result.push(
        <li key={uniqid()} style={styled}>
          <StyledImage
            key={uniqid()}
            style={custom}
            src="/img/chaplain.png"
            alt=""
          />
        </li>,
      )
      i++
    }
    return result
  }
  const succes = {
    color: theme.colors.primary.light,
  }
  const fail = {
    color: theme.colors.error,
  }
  const summary = (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quiz | Examinator </title>
      </Helmet>
      <StyledCertificate>
        <div id={'pdfToPrint'}>
          <h1>Протокол цифрового тестирования</h1>
          <Flex>{images(3)}</Flex>
          <h2>Тема: {etemptQuizeTitle}</h2>
          <h3>ФИО исупытуемого: {user.name}</h3>
          <h3>Дата/время проведения: {etemptTime} </h3>
          <br />
          <h2>Реузультат:</h2>
          <h2 style={score >= 80 ? succes : fail}>
            Тест {score >= 80 ? 'пройден' : 'провален'} с результатом {score}%.
          </h2>
          <p>
            Правлельных ответов: {etemptResult} из {amount}.
          </p>
          <Flex>{images(3)}</Flex>
        </div>
        {logState.isSuccess ? null : (
          <Button onClick={culcSummry}>Рассчитать результат повторно</Button>
        )}
        <Button onClick={getPdf}>Сохранить в PDF </Button>
      </StyledCertificate>
    </>
  )
  return summary
}

export default Summary
