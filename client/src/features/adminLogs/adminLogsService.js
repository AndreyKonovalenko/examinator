import axios from "axios";

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

const adminLogsService = {
  getUserLogs,
  deleteLog,
};

export default adminLogsService;
