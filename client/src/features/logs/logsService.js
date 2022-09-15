import axios from "axios";
const API_URL = "/api/logs/";

// Get logs
const getLogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const logsService = {
  getLogs,
};
export default logsService;
