import { arraysEquality } from "./arraysEquality";

export const culcResult = (questions, answers) => {
  let result = 0;
  questions.forEach((element) => {
    const { _id, currect } = element;
    answers.forEach((el) => {
      if (el.qId === _id.toString()) {
        const test = arraysEquality(currect, el.answer);
        test ? (result += 1) : result;
      }
    });
  });
  return result;
};
