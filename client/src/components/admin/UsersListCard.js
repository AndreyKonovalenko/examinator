import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import uniqid from "uniqid";
import theme from "../../theme/index.js";
const UsersListCard = (props) => {
  const {
    ru,
    en,
    onUserClickHundler,
    userChecked,
    selected,
    isEditHandlerUsers,
    isEditUsersList,
    userCheckedHandler,
    userUnCheckHandler,
    deleteUserHandler,
  } = props;
  const list = props.item.map((element, index) => {
    let checked = false;
    if (userChecked.includes(element._id)) {
      checked = true;
    }

    return (
      <div style={{ display: "flex" }} key={uniqid()}>
        {isEditUsersList ? (
          <CheckBox
            isChecked={checked}
            id={element._id}
            checkedHandler={userCheckedHandler}
            unCheckHandler={userUnCheckHandler}
          />
        ) : null}
        <ListElem
          key={uniqid()}
          style={
            index === selected
              ? {
                  backgroundColor: theme.colors.primary.main,
                  color: theme.colors.text.onPrimary,
                }
              : null
          }
          onClick={(event) => onUserClickHundler([element._id, index], event)}
        >
          <p>
            {element.username} / {element.name}
          </p>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        onSettings={isEditHandlerUsers}
        isEdit={isEditUsersList}
        onDelete={deleteUserHandler}
      />
      <StyledSeparator />
      {ru ? <h2>Пользователи:</h2> : null}
      {en ? <h2>Users:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default UsersListCard;
