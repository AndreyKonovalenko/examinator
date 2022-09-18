import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';
import uniqid from 'uniqid';

const QuizListCard = (props) => {
  const { en, ru, item, onClick } = props;

  const list = item.map((element) => (
    <ListElem key={uniqid()} onClick={() => onClick(element._id)}>
      <h2>{element.title}</h2>
    </ListElem>
  ));

  return (
    <StyledListCard>
      {ru ? (
        <h2>Tемы тестирования: </h2>
      ) : null || en ? (
        <h2> Quizzes: </h2>
      ) : null}
      {list}
    </StyledListCard>
  );
};

export default QuizListCard;
