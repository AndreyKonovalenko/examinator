import { StyledCard } from './styles/Card.styled';
import { useState } from 'react';
import { ListElem } from './styles/ListElem.styled';
import data from '../__mocks__/questions';
import uniqid from 'uniqid';
import shuffle from '../utils/shuffle';

const Card = () => {
  const quiz = shuffle(data);
  const [quest, setQuest] = useState(quiz[0]);

  //
  const selectAnswer = (data, quest) => {
    if (data !== undefined) {
      const index = data.indexOf(quest);
      if (index !== data.length - 1) {
        setQuest(data[index + 1]);
      }
    }
  };

  const onClickHundler = (event) => {
    event.preventDefault();
    console.log('clicked');
    selectAnswer(quiz, quest);
  };

  const list = shuffle(quest.answers).map((element) => (
    <ListElem key={uniqid()} onClick={onClickHundler}>
      <p>{element}</p>
    </ListElem>
  ));
  return (
    <StyledCard>
      <h2>{quest.question}</h2>
      <ul>{list}</ul>
    </StyledCard>
  );
};

export default Card;
