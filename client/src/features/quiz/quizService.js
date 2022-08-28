import axios from 'axios';

const API_URL = '/api/quiz/';

const shuffle = (array) => {
  const arr = array.slice();
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

const calculate = (quiz, log) => {
  let сorrect = 0;
  quiz.forEach((element, index) => {
    if (element.answer[0] === log[index]) {
      сorrect += 1;
    }
  });
  return сorrect;
};

const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getQuiz = async (quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + quizId, config);
  return response.data;
};

const quizService = {
  shuffle,
  calculate,
  getQuizzes,
  getQuiz,
};
export default quizService;
