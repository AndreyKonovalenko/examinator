import axios from "axios";
import { jsPDF } from "jspdf";
import moment from "moment";
import Podkova from "../../assets/fonts/Podkova-Regular.ttf";
import PodkovaExtra from "../../assets/fonts/Podkova-ExtraBold.ttf";
import PodkovaBold from "../../assets/fonts/Podkova-Bold.ttf";
import theme from "../../theme/index.js";

const API_URL = "/api/log/";

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
  localStorage.setItem("log", JSON.stringify(response.data));
  return response.data;
};

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

const createPDF = (log, user, title) => {
  const doc = new jsPDF();
  const score = (
    (Number.parseInt(log.result) / Number.parseInt(log.answers.length)) *
    100
  ).toFixed(0);

  const etemptTime = moment(log.updatedAt).format("DD.MM.YYYY/HH:mm:ss");
  doc.addFont(PodkovaBold, "PodkovaBold", "normal");
  doc.setFont("PodkovaBold");
  doc.setFontSize(28);

  doc.text("Протокол ", 105, 25, null, null, "center");
  doc.text("проверки знаний работников", 105, 40, null, null, "center");
  doc.setFontSize(22);
  doc.text(`Тема: ${title}`, 105, 70, null, null, "center");
  doc.setFontSize(16);
  doc.text(`ФИО:  ${user}`, 105, 85, null, null, "center");
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
  const result = score >= 80 ? "пройден" : "провален";
  const color = score >= 80 ? theme.colors.primary.light : theme.colors.error;
  doc.setTextColor(color);
  doc.text(
    `Тест ${result} с результатом ${score}%`,
    105,
    135,
    null,
    null,
    "center"
  );
  doc.setTextColor(theme.colors.text.onSurface);
  doc.setFontSize(14);
  doc.text(
    `Правильных ответов: ${log.result} из ${log.answers.length}`,
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
