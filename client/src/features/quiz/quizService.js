import axios from "axios";

const API_URI = "/api/quizzes/";

const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URI, config);
  return response.data;
};

const getQuiz = async (quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URI + quizId, config);
  return response.data;
};

const quizService = {
  getQuizzes,
  getQuiz,
};
export default quizService;
