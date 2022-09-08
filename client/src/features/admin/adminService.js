import axios from "axios";
import uniqid from "uniqid";

// QUIZ SERVICE

const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/quizzes", config);
  return response.data;
};

const getFullQuiz = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filtered: data.filtered,
    },
  };
  const response = await axios.get("/api/admin/quizzes/" + data.id, config);
  return response.data;
};

const getQuestion = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/questions/" + id, config);

  const extendedQuestionData = response.data.options.map((element) => {
    return { id: uniqid(), defaultValue: element };
  });
  return { ...response.data, options: extendedQuestionData };
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

const createAndAddQuestionToQuiz = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    "/api/admin/quizzes/" + data.id,
    data.questionData,
    config
  );
  console.log(response.data);
  return response.data;
};

const updateQuestionData = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "/api/admin/questions/" + data.id,
    data.questionData,
    config
  );
  return response.data;
};

const deleteQuestion = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/admin/questions/" + id, config);
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
const quizService = {
  getQuizzes,
  getFullQuiz,
  getQuestion,
  addQuiz,
  createAndAddQuestionToQuiz,
  updateQuestionData,
  deleteQuestion,
  deleteQuiz,
};
export default quizService;
