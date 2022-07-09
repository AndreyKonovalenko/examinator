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

const quizService = {
  getUsers,
  getUserLogs,
};
export default quizService;
