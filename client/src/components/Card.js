import { StyledCard } from './styles/Card.styled';
import { ListElem } from './styles/ListElem.styled';

import uniqid from 'uniqid';
import quizService from '../features/quiz/quizService';

const Card = (props) => {
  const { options, question, _id } = props.item;
  // fucntion to convert array elemtets to object f
  const convertedOptions = options.map((element, index) => {
    return { id: index + 1, value: element };
  });

  const list = quizService.shuffle(convertedOptions).map((element) => (
    <ListElem
      key={uniqid()}
      onClick={(event) => props.onClick(element.id, event)}>
      <p>
        {element.id} {element.value}
      </p>
    </ListElem>
  ));
  return (
    <StyledCard>
      <h2>
        id:{_id} {question}
      </h2>
      <ul>{list}</ul>
    </StyledCard>
  );
};

export default Card;
