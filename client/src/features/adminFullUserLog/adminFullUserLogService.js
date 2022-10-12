import axios from 'axios';

const getFullUserLog = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/logs/' + id, config);
  return response.data;
};

const adminFullUserLogService = {
  getFullUserLog,
};

export default adminFullUserLogService;
