import { StyledQuizCard } from './styles/QuizCard.styled'
import { ListElem } from './styles/ListElem.styled'
import uniqid from 'uniqid'
export default function LogListCard(props) {
  const list = props.item.map((element) => (
    <ListElem key={uniqid()}>
      <p>{element.quiz}</p>
      <p>{element.result}</p>
      <p>{element.updatedAt}</p>
    </ListElem>
  ))

  return (
    <StyledQuizCard>
      <h2>История:</h2>
      {list}
    </StyledQuizCard>
  )
}
