import { StyledCard } from './styles/Card.styled'
import { ListElem } from './styles/ListElem.styled'

import uniqid from 'uniqid'
import quizService from '../features/quiz/quizService'

const Card = (props) => {
  const { options, question } = props.item
  console.log(options, question)
  const list = quizService.shuffle(options).map((element, index) => (
    <ListElem key={uniqid()} onClick={(event) => props.onClick(index, event)}>
      <p>{element}</p>
    </ListElem>
  ))
  return (
    <StyledCard>
      <h2>id: {question}</h2>
      <ul>{list}</ul>
    </StyledCard>
  )
}

export default Card
