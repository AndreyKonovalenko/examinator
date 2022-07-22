import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import uniqid from "uniqid";
import theme from "../../theme";

const QuizListCardAdmin = (props) => {
  const { en, ru, onQuizClickHundler, selected } = props;
  const list = props.item.map((element, index) => (
    <ListElem
      key={uniqid()}
      style={
        index === selected
          ? {
              backgroundColor: theme.colors.primary.main,
              color: theme.colors.text.onPrimary,
            }
          : null
      }
      onClick={(event) => onQuizClickHundler([element._id, index], event)}
    >
      <h2>{element.title}</h2>
    </ListElem>
  ));

  return (
    <StyledListCard>
      {ru ? <h2>Tемы тестирования: </h2> : null}
      {en ? <h2> Quizzes: </h2> : null}
      {list}
    </StyledListCard>
  );
};

export default QuizListCardAdmin;
