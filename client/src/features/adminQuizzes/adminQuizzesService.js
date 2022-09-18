import axios from "axios";

const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/quizzes", config);
  return response.data;
};

const addQuiz = async (quiz, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/admin/quizzes", quiz, config);

  return response.data;
};

const deleteQuiz = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/admin/quizzes/" + id, config);
  return response.data;
};
const adminQuizzesService = {
  getQuizzes,
  addQuiz,
  deleteQuiz,
};
export default adminQuizzesService;
