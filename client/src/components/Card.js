import { StyledCard } from "./styles/Card.styled";
import { ListElem } from "./styles/ListElem.styled";
import { StatusBage } from "./styles/StatusBage.styled";

import uniqid from "uniqid";
import quizService from "../features/quiz/quizService";

const Card = (props) => {
  const { options, question, _id } = props.item;
  // fucntion to convert array elemtets to object
  const convertedOptions = options.map((element, index) => {
    return { id: (index + 1).toString(), value: element };
  });

  const list = quizService.shuffle(convertedOptions).map((element) => (
    <ListElem
      key={uniqid()}
      onClick={(event) => props.onClick([element.id, _id], event)}
    >
      <p>{element.value}</p>
    </ListElem>
  ));
  const styled = {
    textAlign: "right",
    margin: 0,
  };
  return (
    <StyledCard>
      <div style={styled}>
        <StatusBage disable>{props.status}</StatusBage>
      </div>
      <h2>{question}</h2>
      <ul>{list}</ul>
    </StyledCard>
  );
};

export default Card;
