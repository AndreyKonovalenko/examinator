import { StyledQuizCard } from './styles/QuizCard.styled';
import { ListElem } from './styles/ListElem.styled';
import uniqid from 'uniqid';
export default function QuizListCard(props) {
  const list = props.item.map((element) => (
    <ListElem
      key={uniqid()}
      onClick={(event) => props.onClick(element._id, event)}>
      <p>{element.title}</p>
    </ListElem>
  ));

  return (
    <StyledQuizCard>
      <h2>{props.user} Bам доступны темы для тестирования: </h2>
      {list}
    </StyledQuizCard>
  );
}
