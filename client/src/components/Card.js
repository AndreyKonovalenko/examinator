import { StyledCard } from './styles/Card.styled';
import { ListElem } from './styles/ListElem.styled';

import uniqid from 'uniqid';
import shuffle from '../utils/shuffle';

const Card = (props) => {
  const { question, answers } = props.item;
  const list = shuffle(answers).map((element) => (
    <ListElem key={uniqid()} onClick={props.onClick}>
      <p>{element}</p>
    </ListElem>
  ));
  return (
    <StyledCard>
      <h2>{question}</h2>
      <ul>{list}</ul>
    </StyledCard>
  );
};

export default Card;
