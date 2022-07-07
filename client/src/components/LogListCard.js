import moment from "moment";

import { StyledListCard } from "./styles/ListCard.styled";
import { ListElem } from "./styles/ListElem.styled";
import theme from "../theme/index.js";
import uniqid from "uniqid";

const LogListCard = (props) => {
  const list = props.item.map((element) => {
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.quiz.questions.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format("HH:mm:ss/DD.MM.YYYY");

    const succes = {
      color: theme.colors.primary.light,
    };
    const fail = {
      color: theme.colors.error,
    };
    return (
      <ListElem
        key={uniqid()}
        onClick={(event) => props.onClick(element, event)}
      >
        <p>Тема: {element.quiz.title}</p>
        <p style={score >= 80 ? succes : fail}>
          Тест {score >= 80 ? "пройден успешно" : "провален"} с результатом{" "}
          {score}%, правильных ответов: {element.result} из{" "}
          {element.quiz.questions.length}
        </p>
        <p>{etemptTime}</p>
      </ListElem>
    );
  });

  return (
    <StyledListCard>
      <h2>История:</h2>
      {list}
    </StyledListCard>
  );
};

export default LogListCard;
