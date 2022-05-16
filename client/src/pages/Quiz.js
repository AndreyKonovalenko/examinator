import React from 'react'
import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '../components/styles/Button.styled'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadQuiz,
  reset,
  writeLog,
  getResult,
} from '../features/quiz/quizSlice'
import { modalSwitch } from '../features/ui/uiSlice'
import Card from '../components/Card'
import Certificate from '../components/Certificate'
import data from '../__mocks__/questions'

export default function Quiz() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { quiz } = useSelector((state) => state.quiz)
  const { result } = useSelector((state) => state.quiz)
  const { modal } = useSelector((state) => state.ui)
  // const { inProgress } = useSelector((state) => state.inProgress)

  const [inProgress, setInProgress] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  // const [result, setResult] = useState(0)

  console.log(user)
  // Event handlers

  const onClickHundler = (id, event) => {
    event.preventDefault()
    if (qIndex < quiz.length - 1) {
      setQIndex(qIndex + 1)
    }
    if (qIndex === quiz.length - 1) {
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

  const printDocument = () => {
    html2canvas(document.querySelector('#pdfToPrint')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 'JPEG', 0, 0)
      pdf.save('download.pdf')
    })
  }

  const getPdf = (event) => {
    event.preventDefault()
    printDocument()
    //  dispatch(modalSwitch(true))
  }

  // Effect Hooks -----------------------------------------

  useEffect(() => {
    if (quiz === null) {
      dispatch(loadQuiz(data))
      setInProgress(true)
    }
    // setQuiz(shuffle(data));
  }, [quiz, qIndex, dispatch])

  const resultField = (
    <div id="pdfToPrint">
      <h2>
        Правленых ответов:{' '}
        {quiz !== null
          ? `${((result / quiz.length) * 100).toFixed(0)} %`
          : null}
      </h2>
      <Button onClick={tryAgain}>Повторить</Button>
      <Button onClick={getPdf} disabled={modal ? 'true' : null}>
        Пeчатоть результат
      </Button>
    </div>
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
      {modal ? <Certificate /> : null}
    </>
  )
}
