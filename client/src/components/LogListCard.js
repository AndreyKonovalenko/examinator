import moment from 'moment';
import { StyledQuizCard } from './styles/QuizCard.styled';
import { ListElem } from './styles/ListElem.styled';
import theme from '../theme/index.js';
import uniqid from 'uniqid';

const LogListCard = (props) => {
  const list = props.item.map((element) => {
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.quiz.questions.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format('HH:mm:ss DD.MM.YYYY');

    const succes = {
      color: theme.colors.primary.light,
    };
    // const fail = {
    //   color: theme.colors.error,
    // };
    return (
      <ListElem
        key={uniqid()}
        onClick={(event) => props.onClick(element, event)}>
        <p>
          {element.quiz.title}. Попытка осуществлена в {etemptTime}
        </p>
        <p style={score >= 80 ? succes : null}>
          Тест {score >= 80 ? 'пройден успешно' : 'провален'} с результатом{' '}
          {score}%, правлельных ответов: {element.result} из{' '}
          {element.quiz.questions.length}
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
};

export default LogListCard;
