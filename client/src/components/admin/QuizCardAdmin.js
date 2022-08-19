import { useState } from 'react';
import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';
import { StyledSeparator } from '../styles/Separator.styled';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import CheckBox from './CheckBox';
import SettingPanel from './SettingsPanel';
import theme from '../../theme/index.js';
import uniqid from 'uniqid';

import {
  setQuestionsTabOff,
  setAddQuestionModalOn,
  setEditQuestionModalOn,
} from '../../features/ui/uiSlice';
import { getQuestion } from '../../features/admin/adminSlice';

const QuizCardAdmin = (props) => {
  const dispatch = useDispatch();
  const { en, item, ru } = props;
  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

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
      console.log('Question will be deleted');
    } else {
      toast.error('Question for deleting is not selected!');
    }
  };

  const list = item.questions.map((element) => {
    const optionList = element.options.map((el, index) => (
      <li
        key={uniqid()}
        style={
          index === element.currect - 1
            ? { color: theme.colors.primary.light }
            : null
        }>
        {el}
      </li>
    ));
    return (
      <div style={{ display: 'flex' }} key={uniqid()}>
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
          onClick={(event) => onClickHandler(element._id, event)}>
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
