import axios from "axios";

const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/quizzes/", config);
  return response.data;
};

const quizService = {
  getQuizzes,
};
export default quizService;
