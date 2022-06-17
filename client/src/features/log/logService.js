import axios from 'axios'

const API_URL = '/api/log/'

export const getLogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const logService = {
  getLogs,
}
export default logService
