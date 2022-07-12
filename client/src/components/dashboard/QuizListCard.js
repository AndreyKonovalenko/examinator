import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { StatusBage } from "../styles/StatusBage.styled";
import uniqid from "uniqid";

const QuizListCard = (props) => {
  const { user, en, ru } = props;
  const name = user.split(" ").slice(1);
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
      <div style={styled}>
        <StatusBage disable>
          {name[0]} {name[1]}
        </StatusBage>
      </div>
      {ru ? <h2>Tемы тестирования: </h2> : null}
      {en ? <h2> Quizzes: </h2> : null}
      {list}
    </StyledListCard>
  );
};

export default QuizListCard;
