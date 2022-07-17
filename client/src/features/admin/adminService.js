import axios from 'axios';

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/users', config);
  return response.data;
};

const getUserLogs = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/logs/user/' + id, config);
  return response.data;
};

// Create new user
const createNewUser = async (userData) => {
  const response = await axios.post('/api/users', userData);
  console.log(response);
  // this for open user registartion functionality
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};

const quizService = {
  getUsers,
  getUserLogs,
  createNewUser,
};
export default quizService;
