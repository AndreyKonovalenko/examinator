import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';

import Bage from '../controls/Bage';
import uniqid from 'uniqid';
import quizService from '../../features/quiz/quizService';

const Card = (props) => {
  const { options, question, _id, updatedAt } = props.item;
  const { status } = props;
  // fucntion to convert array elements to object
  const convertedOptions = options.map((element, index) => {
    return { id: index.toString(), value: element };
  });

  const list = quizService.shuffle(convertedOptions).map((element) => (
    <ListElem
      key={uniqid()}
      onClick={(event) =>
        props.onClick(
          { answer: element.id, qId: _id, updatedAt: updatedAt },
          event
        )
      }>
      <p>{element.value}</p>
    </ListElem>
  ));

  return (
    <StyledListCard>
      <Bage text={status} />
      <h2>{question}</h2>
      <ul>{list}</ul>
    </StyledListCard>
  );
};

export default Card;
