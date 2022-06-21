import { StyledQuizCard } from './styles/QuizCard.styled';
import { ListElem } from './styles/ListElem.styled';
import uniqid from 'uniqid';
export default function LogListCard(props) {
  const list = props.item.map((element) => {
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.quiz.questions.length)) *
      100
    ).toFixed(0);
    const date = new Date(element.updatedAt);
    const month = date.getMonth() + 1; // getMonth() method returns month in the zero-based from where Jan is 0
    const etemptTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}.${
      month > 9 ? month : '0' + month
    }.${date.getFullYear()} `;
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
