import axios from "axios";

const API_URL_AUTH = "/api/users/";

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_AUTH, config);
  return response.data;
};

const quizService = {
  getUsers,
};
export default quizService;
