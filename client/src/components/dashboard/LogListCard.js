import moment from "moment";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import theme from "../../theme/index.js";
import uniqid from "uniqid";

const LogListCard = (props) => {
  const { en, ru } = props;
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
        {ru ? <p>Тема: {element.quiz.title}</p> : null}
        {en ? <p>Quiz: {element.quiz.title}</p> : null}
        {ru ? (
          <p style={score >= 80 ? succes : fail}>
            Тест {score >= 80 ? "пройден успешно" : "провален"} с результатом{" "}
            {score}%, правильных ответов: {element.result} из{" "}
            {element.quiz.questions.length}
          </p>
        ) : null}
        {en ? (
          <p style={score >= 80 ? succes : fail}>
            {score >= 80 ? "You have succeeded" : "You have failed"} with{" "}
            {score}%, correct answers: {element.result} out of{" "}
            {element.quiz.questions.length}
          </p>
        ) : null}
        <p>{etemptTime}</p>
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
