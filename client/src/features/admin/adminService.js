import axios from "axios";

// USER SERVICE

const createNewUser = async (userData) => {
  const response = await axios.post("/api/users", userData);
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
  const response = await axios.get("/api/admin/users", config);
  return response.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/admin/users/" + id, config);
  return response.data;
};

// LOG SERVICE

const getUserLogs = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/logs/user/" + id, config);
  return response.data;
};

const deleteLog = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/admin/logs/" + id, config);
  return response.data;
};

const quizService = {
  getUsers,
  getUserLogs,
  createNewUser,
  deleteLog,
  deleteUser,
};
export default quizService;
