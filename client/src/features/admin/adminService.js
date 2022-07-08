import axios from "axios";

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/users", config);
  return response.data;
};

const API_URL_LOG = "/api/log/";

const getUserLogs = async (user_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_LOG, user_id, config);
  return response.data;
};

const quizService = {
  getUsers,
  getUserLogs,
};
export default quizService;
