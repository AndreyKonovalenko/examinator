import uniqid from "uniqid";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { useTheme } from "styled-components";
import { updatedAtParser, dateCompare } from "../../utils/dateUtils";
import { scoreCulc } from "../../utils/scoreCulc";

const LogListCard = (props) => {
  const theme = useTheme();
  const { item, onClick, en, ru } = props;

  const list = item.map((element) => {
    if (element.quiz === null) {
      return (
        <ListElem key={uniqid()} onClick={() => onClick(element)}>
          <h2>
            {en ? "Quiz has been deleted" : null}
            {ru ? "Тест был удлен из системы" : null}
          </h2>
        </ListElem>
      );
    }

    const score = scoreCulc(element.result, element.answers);
    const etemptTime = updatedAtParser(element.updatedAt);
    const lastQuizUpdate = updatedAtParser(element.quiz.updatedAt);
    const comparedDates = dateCompare(
      element.updatedAt,
      element.quiz.updatedAt
    );
    const success = {
      color: theme.colors.primary.light,
    };
    const fail = {
      color: theme.colors.error,
    };

    return (
      <ListElem key={uniqid()} onClick={() => onClick(element)}>
        {ru ? <p>Тема: {element.title}</p> : null}
        {en ? <p>Quiz: {element.title}</p> : null}
        {ru ? (
          <p style={score >= 80 ? success : fail}>
            Тест {score >= 80 ? "пройден успешно" : "провален"} с результатом{" "}
            {score}%, правильных ответов: {element.result} из{" "}
            {element.answers.length}
          </p>
        ) : null}
        {en ? (
          <p style={score >= 80 ? success : fail}>
            {score >= 80 ? "You have succeeded" : "You have failed"} with{" "}
            {score}%, correct answers: {element.result} out of{" "}
            {element.answers.length}
          </p>
        ) : null}
        <p>{etemptTime}</p>
        <p style={comparedDates ? success : fail}>
          {en
            ? comparedDates
              ? "Relevant"
              : `Irrelevant, quiz last update at ${lastQuizUpdate}`
            : null}
          {ru
            ? comparedDates
              ? "Актуальный результат"
              : `Результат устарел, структура опроса изменена позднее даты попытки: ${lastQuizUpdate}`
            : null}
        </p>
      </ListElem>
    );
  });

  return (
    <StyledListCard>
      {ru ? <h2>История:</h2> : null}
      {en ? <h2>User history:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default LogListCard;
