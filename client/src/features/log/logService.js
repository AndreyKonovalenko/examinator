import axios from "axios";
import { jsPDF } from "jspdf";
import chaplain from "../../img/chaplain.png";
import Podkova from "../../fonts/Podkova-Regular.ttf";
import PodkovaBold from "../../fonts/Podkova-Bold.ttf";

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

const random = () => Math.floor(Math.random() * 359);
console.log(random());

const createPDF = (score) => {
  const doc = new jsPDF();

  doc.addFont(PodkovaBold, "PodkovaBold", "normal");
  doc.setFont("PodkovaBold"); // set font
  doc.setFontSize(24);

  doc.text("Протокол ", 105, 20, null, null, "center");
  doc.text("цифрового тестирования", 105, 35, null, null, "center");

  doc.addImage(chaplain, "PNG", 20, 50, 8, 8, null, null, random());
  doc.addImage(chaplain, "PNG", 100, 50, 8, 8, null, null, random());
  doc.addImage(chaplain, "PNG", 180, 50, 8, 8, null, null, random());

  doc.addImage(chaplain, "PNG", 20, 100, 8, 8, null, null, random());
  doc.addImage(chaplain, "PNG", 100, 100, 8, 8, null, null, random());
  doc.addImage(chaplain, "PNG", 180, 100, 8, 8, null, null, random());

  doc.text(`${score}`, 20, 200);

  return doc;
};

const logService = {
  getLogs,
  setLog,
  getLog,
  createPDF,
};
export default logService;
