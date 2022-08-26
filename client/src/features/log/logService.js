import axios from "axios";
import { jsPDF } from "jspdf";
import moment from "moment";
import PodkovaBold from "../../assets/fonts/Podkova-Bold.ttf";
import theme from "../../theme/index.js";

const API_URL = "/api/log/";

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

const createPDF = ({ title, name, result, answers, updatedAt }) => {
  const doc = new jsPDF();
  const score = (
    (Number.parseInt(result) / Number.parseInt(answers.length)) *
    100
  ).toFixed(0);

  const etemptTime = moment(updatedAt).format("DD.MM.YYYY/HH:mm:ss");
  doc.addFont(PodkovaBold, "PodkovaBold", "normal");
  doc.setFont("PodkovaBold");
  doc.setFontSize(28);

  doc.text("Протокол ", 105, 25, null, null, "center");
  doc.text("проверки знаний работников", 105, 40, null, null, "center");
  doc.setFontSize(22);
  doc.text(`Тема: ${title}`, 105, 70, null, null, "center");
  doc.setFontSize(16);
  doc.text(`ФИО:  ${name}`, 105, 85, null, null, "center");
  doc.text(
    `Дата/время проведения: ${etemptTime}`,
    105,
    100,
    null,
    null,
    "center"
  );

  doc.setFontSize(22);
  doc.text("Результат:", 105, 120, null, null, "center");
  const summary = score >= 80 ? "пройден" : "провален";
  const color = score >= 80 ? theme.colors.primary.light : theme.colors.error;
  doc.setTextColor(color);
  doc.text(
    `Тест ${summary} с результатом ${score}%`,
    105,
    135,
    null,
    null,
    "center"
  );
  doc.setTextColor(theme.colors.text.onSurface);
  doc.setFontSize(14);
  doc.text(
    `Правильных ответов: ${result} из ${answers.length}`,
    105,
    145,
    null,
    null,
    "center"
  );

  return doc;
};

const logService = {
  getLogs,
  setLog,
  getLog,
  createPDF,
};
export default logService;
