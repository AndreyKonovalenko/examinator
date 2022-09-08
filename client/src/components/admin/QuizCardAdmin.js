import { useState } from "react";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import CheckBox from "./CheckBox";
import Bage from "../controls/Bage";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme/index.js";
import uniqid from "uniqid";

import {
  setQuestionsTabOff,
  setAddQuestionModalOn,
  setEditQuestionModalOn,
} from "../../features/ui/uiSlice";
import {
  getFullQuiz,
  updateQuestionData,
} from "../../features/adminQuiz/adminQuizSlice";
import { getQuestion } from "../../features/adminQuestion/adminQuiestionSlice";

const QuizCardAdmin = (props) => {
  const dispatch = useDispatch();
  const { en, item, ru } = props;
  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const onUnArchiveHandler = () => {
    dispatch(getFullQuiz({ id: item._id, filtered: isFiltered }));
    setIsFiltered(!isFiltered);
  };
  // List Hadlers
  const onClickHandler = (id, event) => {
    event.preventDefault();
    dispatch(setEditQuestionModalOn());
    dispatch(getQuestion(id));
    setIsSelected(id);
  };

  const onCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked([...isChecked, id]);
  };

  const unCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked(isChecked.filter((element) => element !== id));
  };

  // Settings Panel Handlers

  const onAddHandler = () => {
    dispatch(setAddQuestionModalOn());
  };

  const onCloseHandler = () => {
    dispatch(setQuestionsTabOff());
  };

  const onGearHandler = () => {
    setIsEdit(!isEdit);
  };

  const onDeleteHandler = () => {
    if (isChecked.length > 0) {
      console.log("Question will be deleted");
      isChecked.forEach((element) =>
        dispatch(
          updateQuestionData({ id: element, questionData: { archived: true } })
        )
      );
    } else {
      toast.error("Question for deleting is not selected!");
    }
  };

  const list = item.questions.map((element) => {
    const optionList = element.options.map((el, index) => (
      <li
        key={uniqid()}
        style={
          index === parseInt(element.currect)
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
            onCheckHandler={onCheckHandler}
            id={element._id}
            isChecked={isChecked.includes(element._id) ? true : false}
            unCheckHandler={unCheckHandler}
          />
        ) : null}

        <ListElem
          key={uniqid()}
          style={
            element._id === isSelected
              ? {
                  backgroundColor: theme.colors.primary.main,
                  color: theme.colors.text.onPrimary,
                }
              : null
          }
          onClick={(event) => onClickHandler(element._id, event)}
        >
          {element.archived ? (
            <Bage text={ru ? "архивный" : null || en ? "achived" : null} />
          ) : null}
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
        onDelete={onDeleteHandler}
        onSettings={onGearHandler}
        onUnArchive={onUnArchiveHandler}
      />
      <StyledSeparator />

      {ru ? <h2>Тема: {item.title}</h2> : null}
      {en ? <h2>Theme: {item.title}</h2> : null}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 0,
        }}
      ></div>

      <span>
        {ru ? "всего вопросов: " : null || en ? "number of questions: " : null}
        {item.questions.length}
      </span>
      <StyledSeparator />

      {list}
    </StyledListCard>
  );
};

export default QuizCardAdmin;
