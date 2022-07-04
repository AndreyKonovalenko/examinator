import axios from 'axios';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import Podkova from '../../assets/fonts/Podkova-Regular.ttf';
import PodkovaExtra from '../../assets/fonts/Podkova-ExtraBold.ttf';
import PodkovaBold from '../../assets/fonts/Podkova-Bold.ttf';

const API_URL = '/api/log/';

const getLogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create new log
const setLog = async (userAnswers, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, userAnswers, config);
  localStorage.setItem('log', JSON.stringify(response.data));
  return response.data;
};

const getLog = async (logId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + logId, config);
  localStorage.setItem('log', JSON.stringify(response.data));
  return response.data;
};

const createPDF = (log, user, title) => {
  const doc = new jsPDF();
  const etemptTime = moment(log.updatedAt).format('DD.MM.YYYY/HH:mm:ss');
  doc.addFont(PodkovaExtra, 'PodkovaExtra', 'normal');
  doc.setFont('PodkovaExtra');
  doc.setFontSize(28);

  doc.text('Протокол ', 105, 20, null, null, 'center');
  doc.text('цифрового тестирования', 105, 40, null, null, 'center');
  doc.setFontSize(22);
  doc.text(`Тема: ${title}`, 105, 70, null, null, 'center');
  doc.setFontSize(16);
  doc.text(`ФИО Испытуемого/ой ${user}`, 105, 85, null, null, 'center');
  doc.text(
    `Дата/время проведения ${etemptTime}`,
    105,
    100,
    null,
    null,
    'center'
  );
  doc.text(`${log.result}`, 20, 200);

  return doc;
};

const logService = {
  getLogs,
  setLog,
  getLog,
  createPDF,
};
export default logService;
