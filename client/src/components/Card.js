import { StyledCard } from './styles/Card.styled'
import { ListElem } from './styles/ListElem.styled'

import uniqid from 'uniqid'
import quizService from '../features/quiz/quizService'

export default function Card({ item: { question, answers, id }, onClick }) {
  // const { question, answers } = props.item;
  const list = quizService.shuffle(answers).map((element) => (
    <ListElem key={uniqid()} onClick={(event) => onClick(element.id, event)}>
      <p>{element.value}</p>
    </ListElem>
  ))
  return (
    <StyledCard>
      <h2>
        id: {id} {question}
      </h2>
      <ul>{list}</ul>
    </StyledCard>
  )
}
