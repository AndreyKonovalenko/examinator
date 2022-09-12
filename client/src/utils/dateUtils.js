import moment from "moment";

export const updatedAtParser = (updatedAt) =>
  moment(updatedAt).format("DD.MM.YYYY/HH:mm:ss");

export const dateCompare = (logDate, quizDate) => {
  const date1 = new Date(logDate);
  const date2 = new Date(quizDate);
  return date1 >= date2;
};
