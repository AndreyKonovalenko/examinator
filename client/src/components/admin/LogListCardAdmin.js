import moment from "moment";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme/index.js";
import uniqid from "uniqid";

const LogListCardAdmin = (props) => {
  const {
    сheckedHandler,
    checked,
    deleteHandler,
    en,
    isEdit,
    item,
    onClickHandler,
    onCloseHandler,
    onSettingsHandler,
    ru,
    unCheckHandler,
  } = props;
  const list = item.map((element) => {
    let isChecked = false;
    if (checked.includes(element._id)) {
      isChecked = true;
    }
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.quiz.questions.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format("HH:mm:ss/DD.MM.YYYY");

    const succes = {
      color: theme.colors.primary.light,
    };
    const fail = {
      color: theme.colors.error,
    };

    return (
      <div style={{ display: "flex" }} key={uniqid()}>
        {isEdit ? (
          <CheckBox
            checked={isChecked}
            id={element._id}
            checkedHandler={сheckedHandler}
            unCheckHandler={unCheckHandler}
          />
        ) : null}

        <ListElem
          key={uniqid()}
          onClick={(event) => onClickHandler(element._id, event)}
        >
          {ru ? <p>Тема: {element.quiz.title}</p> : null}
          {en ? <p>Quiz: {element.quiz.title}</p> : null}
          {ru ? (
            <p style={score >= 80 ? succes : fail}>
              Тест {score >= 80 ? "пройден успешно" : "провален"} с результатом{" "}
              {score}%, правильных ответов: {element.result} из{" "}
              {element.quiz.questions.length}
            </p>
          ) : null}
          {en ? (
            <p style={score >= 80 ? succes : fail}>
              {score >= 80 ? "You have succeeded" : "You have failed"} with{" "}
              {score}%, correct answers: {element.result} out of{" "}
              {element.quiz.questions.length}
            </p>
          ) : null}
          <p>{etemptTime}</p>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        hideAdd={true}
        isEdit={isEdit}
        onClose={onCloseHandler}
        onDelete={deleteHandler}
        onSettings={onSettingsHandler}
      />
      <StyledSeparator />
      {ru ? <h2>История:</h2> : null}
      {en ? <h2>User history:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default LogListCardAdmin;
