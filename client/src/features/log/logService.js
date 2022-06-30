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

// Create new log
const setLog = async (userAnswers, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, userAnswers, config)
  localStorage.setItem('log', JSON.stringify(response.data))
  return response.data
}

export const getLog = async (logId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + logId, config)
  localStorage.setItem('log', JSON.stringify(response.data))
  return response.data
}

const logService = {
  getLogs,
  setLog,
  getLog,
}
export default logService
