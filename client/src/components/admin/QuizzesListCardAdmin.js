import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ListElem } from "../styles/ListElem.styled";
import { StyledListCard } from "../styles/ListCard.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import {
  setAddQuizModalOn,
  setQuestionsTabOn,
  setQuizzesTabOff,
} from "../../features/ui/uiSlice";
import {
  getFullQuiz,
  deleteQuiz,
  getQuizzes,
} from "../../features/admin/adminSlice";

import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme";
import uniqid from "uniqid";

const QuizzesListCardAdmin = (props) => {
  const dispatch = useDispatch();
  const { en, item, ru } = props;
  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // List Hadlers

  const onClickHandler = (id, event) => {
    event.preventDefault();
    setIsSelected(id);
    dispatch(getFullQuiz(id));
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
        hideToggle={true}
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
