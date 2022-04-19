import { StyledCard } from './styles/Card.styled'
import uniqid from 'uniqid';

const Card = ({ item: {question, answers} }) => {
    const list =  answers.map((element) => (
        <li key={uniqid()}><p>{element}</p></li>
    ));
  return (
    <StyledCard>
      <div>
        <h2>{question}</h2>
        <ul>
         {list}
        </ul>    
      </div>
    </StyledCard>
  )
}

export default Card;