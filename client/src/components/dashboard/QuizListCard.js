import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';
import Bage from '../controls/Bage';
import uniqid from 'uniqid';

const QuizListCard = (props) => {
  const { user, en, ru, item, onClick } = props;
  const name = user.split(' ').slice(1);

  const list = item.map((element) => (
    <ListElem key={uniqid()} onClick={() => onClick(element._id)}>
      <h2>{element.title}</h2>
    </ListElem>
  ));

  return (
    <StyledListCard>
      <Bage text={`${name[0]} ${name[1]}`} />
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
