import { StyledQuizCard } from './styles/QuizCard.styled'
import { ListElem } from './styles/ListElem.styled'
import { Button } from './styles/Button.styled'
import uniqid from 'uniqid'
export default function QuizListCard(props) {
  const list = props.item.map((element) => (
    <ListElem key={uniqid}>
      <p>{element.title}</p>
    </ListElem>
  ))

  return (
    <StyledQuizCard>
      <h2>{props.user} Bам доступные темы для тестриования: </h2>
      {list}
    </StyledQuizCard>
  )
}
