import { StyledQuizCard } from './styles/QuizCard.styled';
import { ListElem } from './styles/ListElem.styled';
import uniqid from 'uniqid';
import moment from 'moment';
export default function LogListCard(props) {
  const list = props.item.map((element) => {
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.quiz.questions.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format('HH:MM:SS DD.MM.YYYY');
    return (
      <ListElem key={uniqid()}>
        <p>
          {element.quiz.title}. Попытка осуществлена в {etemptTime}{' '}
        </p>
        <p>
          Правлельных ответов: {element.result} из{' '}
          {element.quiz.questions.length}, тест{' '}
          {score >= 80 ? 'пройден' : 'провален'} с результатом {score}%.
        </p>
      </ListElem>
    );
  });

  return (
    <StyledQuizCard>
      <h2>История:</h2>
      {list}
    </StyledQuizCard>
  );
}
