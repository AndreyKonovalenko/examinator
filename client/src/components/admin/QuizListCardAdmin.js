import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import uniqid from "uniqid";

const QuizListCardAdmin = (props) => {
  const { en, ru } = props;
  const list = props.item.map((element) => (
    <ListElem
      key={uniqid()}
      onClick={(event) => props.onClick(element._id, event)}
    >
      <h2>{element.title}</h2>
    </ListElem>
  ));

  const styled = {
    textAlign: "right",
    margin: 0,
  };
  return (
    <StyledListCard>
      <div style={styled}></div>
      {ru ? <h2>Tемы тестирования: </h2> : null}
      {en ? <h2> Quizzes: </h2> : null}
      {list}
    </StyledListCard>
  );
};

export default QuizListCardAdmin;
