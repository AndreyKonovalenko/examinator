const shuffle = (array) => {
  const arr = array.slice()
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ]
  }

  return arr
}

const calculate = (quiz, log) => {
  let сorrect = 0
  quiz.forEach((element, index) => {
    if (element.answer[0] === log[index]) {
      сorrect += 1
    }
  })
  return сorrect
}

const quizService = {
  shuffle,
  calculate,
}
export default quizService
