import axios from "axios";

const API_URL = "/api/logs/";

// Create new log
const setLog = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  localStorage.setItem("log", JSON.stringify(response.data));
  return response.data;
};

// Get log
const getLog = async (logId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + logId, config);
  localStorage.setItem("log", JSON.stringify(response.data));
  return response.data;
};

const logService = {
  setLog,
  getLog,
};
export default logService;
