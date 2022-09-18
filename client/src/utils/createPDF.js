import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { scoreCulc } from './scoreCulc';
import { updatedAtParser } from './dateUtils';
import PodkovaBold from '../assets/fonts/Podkova-Bold.ttf';
import theme from '../theme/index.js';

const createPDF = (log, lang) => {
  const { title, name, result, answers, updatedAt } = log;
  const { ru, en } = lang;
  const doc = new jsPDF();
  const score = scoreCulc(result, answers);
  const etemptTime = updatedAtParser(updatedAt);
  doc.addFont(PodkovaBold, 'PodkovaBold', 'normal');
  doc.setFont('PodkovaBold');
  doc.setFontSize(28);

  doc.text(
    `${(ru && 'Протокол') || (en && 'Quiz')}`,
    105,
    25,
    null,
    null,
    'center'
  );
  doc.text(
    `${(ru && 'проверки знаний') || (en && 'result cirtificate')}`,
    105,
    40,
    null,
    null,
    'center'
  );
  doc.setFontSize(22);
  doc.text(
    `${(ru && 'Тема:') || (en && 'Topic:')} ${title}`,
    105,
    70,
    null,
    null,
    'center'
  );
  doc.setFontSize(16);
  doc.text(
    `${(ru && 'ФИО') || (en && 'Full name')}:  ${name}`,
    105,
    85,
    null,
    null,
    'center'
  );
  doc.text(
    `${(ru && 'Дата/время проведения') || (en && 'Date/time')}: ${etemptTime}`,
    105,
    100,
    null,
    null,
    'center'
  );

  doc.setFontSize(22);
  doc.text(
    `${(ru && 'Результат') || (en && 'Score')}:`,
    105,
    120,
    null,
    null,
    'center'
  );
  const summary =
    score >= 80
      ? `${(ru && 'пройден') || (en && 'succeeded')}`
      : `${(ru && 'провален') || (en && 'failed')}`;
  const color = score >= 80 ? theme.colors.primary.light : theme.colors.error;
  doc.setTextColor(color);
  doc.text(
    `${(ru && 'Тест') || (en && 'You have')}  ${summary} ${
      (ru && 'c результатом') || (en && 'with')
    } ${score}%`,
    105,
    135,
    null,
    null,
    'center'
  );
  doc.setTextColor(theme.colors.text.onSurface);
  doc.setFontSize(14);
  doc.text(
    `${(ru && 'Правильных ответов') || (en && 'Correct answers')}: ${result} ${
      (ru && 'из') || (en && 'out of')
    } ${answers.length}`,
    105,
    145,
    null,
    null,
    'center'
  );

  return doc;
};

export const printDocument = (log, lang) => {
  if (log) {
    const { name, title } = log;
    const doc = createPDF(log, lang);
    html2canvas(document.querySelector('#pdfToPrintFirst')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'JEPEG', 0, 50);
      html2canvas(document.querySelector('#pdfToPrintSecond')).then(
        (canvas) => {
          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'JEPEG', 0, 155);
          doc.save(`${name} ${title}.pdf`);
        }
      );
    });
  }
};
