import { StyledCard } from './styles/Card.styled';
import { Button } from './styles/Button.styled';
import { ListElem } from './styles/ListElem.styled';
import uniqid from 'uniqid';
import shuffle from '../utils/shuffle';

const Card = ({ item: { question, answers } }) => {
  const list = shuffle(answers).map((element) => (
      <ListElem key={uniqid()}>
        <p>{element}</p>
      </ListElem>
  ));
  return (
    <StyledCard>
        <h2>{question}</h2>
        <ul title={question}>{list}</ul>
    </StyledCard>
  );
};

export default Card;
