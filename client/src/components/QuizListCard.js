import { StyledQuizCard } from './styles/QuizCard.styled';
import { ListElem } from './styles/ListElem.styled';
import uniqid from 'uniqid';

const QuizListCard = (props) => {
  const { user } = props;
  const name = user.split(' ').slice(1);
  const list = props.item.map((element) => (
    <ListElem
      key={uniqid()}
      onClick={(event) => props.onClick(element._id, event)}>
      <h2>{element.title}</h2>
    </ListElem>
  ));

  return (
    <StyledQuizCard>
      <h2>
        {name[0]} {name[1]},{' '}
      </h2>
      <h2>доступые темы для тестирования: </h2>
      {list}
    </StyledQuizCard>
  );
};

export default QuizListCard;
