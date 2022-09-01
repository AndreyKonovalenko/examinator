import { jsPDF } from 'jspdf';
import moment from 'moment';
import html2canvas from 'html2canvas';

import PodkovaBold from '../assets/fonts/Podkova-Bold.ttf';
import theme from '../theme/index.js';

const createPDF = ({ title, name, result, answers, updatedAt }) => {
  const doc = new jsPDF();
  const score = (
    (Number.parseInt(result) / Number.parseInt(answers.length)) *
    100
  ).toFixed(0);

  const etemptTime = moment(updatedAt).format('DD.MM.YYYY/HH:mm:ss');
  doc.addFont(PodkovaBold, 'PodkovaBold', 'normal');
  doc.setFont('PodkovaBold');
  doc.setFontSize(28);

  doc.text('Протокол ', 105, 25, null, null, 'center');
  doc.text('проверки знаний работников', 105, 40, null, null, 'center');
  doc.setFontSize(22);
  doc.text(`Тема: ${title}`, 105, 70, null, null, 'center');
  doc.setFontSize(16);
  doc.text(`ФИО:  ${name}`, 105, 85, null, null, 'center');
  doc.text(
    `Дата/время проведения: ${etemptTime}`,
    105,
    100,
    null,
    null,
    'center'
  );

  doc.setFontSize(22);
  doc.text('Результат:', 105, 120, null, null, 'center');
  const summary = score >= 80 ? 'пройден' : 'провален';
  const color = score >= 80 ? theme.colors.primary.light : theme.colors.error;
  doc.setTextColor(color);
  doc.text(
    `Тест ${summary} c результатом ${score}%`,
    105,
    135,
    null,
    null,
    'center'
  );
  doc.setTextColor(theme.colors.text.onSurface);
  doc.setFontSize(14);
  doc.text(
    `Правильных ответов: ${result} из ${answers.length}`,
    105,
    145,
    null,
    null,
    'center'
  );

  return doc;
};

export const printDocument = (log) => {
  if (log) {
    const { name, title } = log;
    const doc = createPDF(log);
    html2canvas(document.querySelector('#pdfToPrint')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'JEPEG', 0, 50);
      html2canvas(document.querySelector('#pdfToPrint1')).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'JEPEG', 0, 155);
        doc.save(`${name} ${title}.pdf`);
      });
    });
  }
};
