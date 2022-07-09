import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';
import uniqid from 'uniqid';
import theme from '../../theme/index.js';
const UsersListCard = (props) => {
  console.log(props.selected);
  const list = props.item.map((element, index) => {
    if (index === props.selected)
      return (
        <ListElem
          key={uniqid()}
          style={{
            backgroundColor: theme.colors.primary.main,
            color: theme.colors.text.onPrimary,
          }}
          onClick={(event) => props.onClick([element._id, index], event)}>
          <p>
            {element.username} / {element.name}
          </p>
        </ListElem>
      );
    else {
      return (
        <ListElem
          key={uniqid()}
          onClick={(event) => props.onClick([element._id, index], event)}>
          <p>
            {element.username} / {element.name}
          </p>
        </ListElem>
      );
    }
  });

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
