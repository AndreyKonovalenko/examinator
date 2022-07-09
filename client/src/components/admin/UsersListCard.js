import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';
import uniqid from 'uniqid';

const UsersListCard = (props) => {
  const list = props.item.map((element) => (
    <ListElem
      key={uniqid()}
      id={uniqid()}
      onClick={(event) => props.onClick(element._id, event)}>
      <p>{element.name}</p>
    </ListElem>
  ));

  const styled = {
    textAlign: 'right',
    margin: 0,
  };
  return (
    <StyledListCard>
      <h2>Пользователи:</h2>
      <div style={styled}></div>
      {list}
    </StyledListCard>
  );
};

export default UsersListCard;
