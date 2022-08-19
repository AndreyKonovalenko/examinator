import axios from 'axios';
import uniqid from 'uniqid';

// USER SERVICE

const createNewUser = async (userData) => {
  const response = await axios.post('/api/users', userData);
  // this for open user registartion functionality
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/users', config);
  return response.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete('/api/admin/users/' + id, config);
  return response.data;
};

// LOG SERVICE

const getUserLogs = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/logs/user/' + id, config);
  return response.data;
};

const deleteLog = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete('/api/admin/logs/' + id, config);
  return response.data;
};

// QUIZ SERVICE

const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/quizzes', config);
  return response.data;
};

const getFullQuiz = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/quizzes/' + id, config);
  return response.data;
};

const getQuestion = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/questions/' + id, config);

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
  const response = await axios.post('/api/admin/quizzes', quiz, config);

  return response.data;
};

const createAndAddQuestionToQuiz = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    '/api/admin/quizzes/' + data.id,
    data.questionData,
    config
  );
  return response.data;
};

const updateQuestionData = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    '/api/admin/questions/' + data.id,
    data.questionData,
    config
  );
  return response.data;
};

const quizService = {
  getUsers,
  getUserLogs,
  createNewUser,
  deleteLog,
  deleteUser,
  getQuizzes,
  getFullQuiz,
  getQuestion,
  addQuiz,
  createAndAddQuestionToQuiz,
  updateQuestionData,
};
export default quizService;
