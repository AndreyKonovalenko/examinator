import moment from 'moment';
import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';
import theme from '../../theme/index.js';
import uniqid from 'uniqid';

const LogListCard = (props) => {
  const { item, onClick } = props;
  const { en, ru } = props;
  const list = item.map((element) => {
    if (element.quiz === null) {
      return (
        <ListElem key={uniqid()} onClick={(event) => onClick(element, event)}>
          <h2>
            {en ? 'Quiz has been deleted' : null}
            {ru ? 'Тест был удлен из системы' : null}
          </h2>
        </ListElem>
      );
    }

    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.answers.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format('HH:mm:ss/DD.MM.YYYY');

    const succes = {
      color: theme.colors.primary.light,
    };
    const fail = {
      color: theme.colors.error,
    };

    return (
      <ListElem key={uniqid()} onClick={(event) => onClick(element, event)}>
        {ru ? <p>Тема: {element.title}</p> : null}
        {en ? <p>Quiz: {element.title}</p> : null}
        {ru ? (
          <p style={score >= 80 ? succes : fail}>
            Тест {score >= 80 ? 'пройден успешно' : 'провален'} с результатом{' '}
            {score}%, правильных ответов: {element.result} из{' '}
            {element.answers.length}
          </p>
        ) : null}
        {en ? (
          <p style={score >= 80 ? succes : fail}>
            {score >= 80 ? 'You have succeeded' : 'You have failed'} with{' '}
            {score}%, correct answers: {element.result} out of{' '}
            {element.answers.length}
          </p>
        ) : null}
        <p>{etemptTime}</p>
        <p>
          {typeof element.updatedAt} {element.quiz.updatedAt}
        </p>
      </ListElem>
    );
  });

  return (
    <StyledListCard>
      {ru ? <h2>История:</h2> : null}
      {en ? <h2>User history:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default LogListCard;
