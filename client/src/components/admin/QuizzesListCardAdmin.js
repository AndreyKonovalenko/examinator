import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import uniqid from "uniqid";
import { useTheme } from "styled-components";
import { ListElem } from "../styles/ListElem.styled";
import { StyledListCard } from "../styles/ListCard.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import {
  setAddQuizModalOn,
  setQuestionsTabOn,
  setQuizzesTabOff,
} from "../../features/ui/uiSlice";
import {
  getQuizzes,
  deleteQuiz,
} from "../../features/adminQuizzes/adminQuizzesSlice";
import { getFullQuiz } from "../../features/adminQuiz/adminQuizSlice";

import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";

const QuizzesListCardAdmin = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { en, item, ru } = props;
  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // List Hadlers

  const onClickHandler = (id, event) => {
    event.preventDefault();
    setIsSelected(id);
    dispatch(getFullQuiz({ id: id, filtered: true }));
    dispatch(setQuestionsTabOn());
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
    dispatch(setAddQuizModalOn());
  };

  const onCloseHandler = () => {
    dispatch(setQuizzesTabOff());
  };

  const onGearHandler = () => {
    setIsEdit(!isEdit);
    dispatch(getQuizzes());
  };

  const onDeleteHandler = () => {
    if (isChecked.length > 0) {
      dispatch(deleteQuiz(isChecked));
    } else {
      toast.error("Quiz for deleting is not selected!");
    }
  };

  const list = item.map((element) => {
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
          <h2>{element.title}</h2>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        hideUnArchive={true}
        isEdit={isEdit}
        onAdd={onAddHandler}
        onClose={onCloseHandler}
        onDelete={onDeleteHandler}
        onSettings={onGearHandler}
      />
      <StyledSeparator />
      {ru ? <h2>Tемы тестирования: </h2> : null}
      {en ? <h2> Quizzes: </h2> : null}
      {list}
    </StyledListCard>
  );
};

export default QuizzesListCardAdmin;
