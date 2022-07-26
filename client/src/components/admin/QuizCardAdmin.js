import moment from "moment";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme/index.js";
import uniqid from "uniqid";

const QuizCardAdmin = (props) => {
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
    unCheckHandler,
  } = props;
  const list = item.questions.map((element, index) => {
    const optionList = element.options.map((el, index) => (
      <li
        key={uniqid()}
        style={
          index === element.currect - 1
            ? { color: theme.colors.primary.light }
            : null
        }
      >
        {el}
      </li>
    ));
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
          onClick={(event) => onClickHandler([element._id, index], event)}
        >
          <h3>{element.question}</h3>
          <ul>{optionList}</ul>
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

      {ru ? <h2>Тема: {item.title}</h2> : null}
      {en ? <h2>Theme: {item.title}</h2> : null}
      {ru ? <h3>всeго: {item.questions.length}</h3> : null}
      {en ? <h3>total: {item.questions.length}</h3> : null}
      <StyledSeparator />
      {list}
    </StyledListCard>
  );
};

export default QuizCardAdmin;
