import { StyledCard } from './styles/Card.styled';
import { Button } from './styles/Button.styled';
import { Flex } from './styles/Flex.styled';
import uniqid from 'uniqid';
import shuffle from '../utils/shuffle';

const Card = ({ item: { question, answers } }) => {
  const list = shuffle(answers).map((element) => (
    <Button>
      <li key={uniqid()}>
        <p>{element}</p>
      </li>
    </Button>
  ));
  return (
    <StyledCard>
        <h2>{question}</h2>
          <ul>{list}</ul>
    </StyledCard>
  );
};

export default Card;
