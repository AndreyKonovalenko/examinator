import { ListElem } from "../styles/ListElem.styled";
import { StyledListCard } from "../styles/ListCard.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme";
import uniqid from "uniqid";

const QuizzesListCardAdmin = (props) => {
  const {
    сheckedHandler,
    checked,
    deleteHandler,
    en,
    isEdit,
    item,
    onAddHandler,
    onClickHandler,
    onCloseHandler,
    onSettingsHandler,
    ru,
    selected,
    unCheckHandler,
  } = props;
  const list = item.map((element, index) => {
    return (
      <div style={{ display: "flex" }} key={uniqid()}>
        {isEdit ? (
          <CheckBox
            checkedHandler={сheckedHandler}
            id={element._id}
            isChecked={checked.includes(element._id) ? true : false}
            unCheckHandler={unCheckHandler}
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
          onClick={(event) => onClickHandler([element._id, index], event)}
        >
          <h2>{element.title}</h2>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        isEdit={isEdit}
        onAdd={onAddHandler}
        onClose={onCloseHandler}
        onDelete={deleteHandler}
        onSettings={onSettingsHandler}
      />
      <StyledSeparator />
      {ru ? <h2>Tемы тестирования: </h2> : null}
      {en ? <h2> Quizzes: </h2> : null}
      {list}
    </StyledListCard>
  );
};

export default QuizzesListCardAdmin;
