import { useState, useEffect } from 'react';
import { Button } from '../styles/Textarea.styled';
import { useDispatch, useSelector } from 'react-redux';
import { IconStyled } from '../styles/Icon.styled';
import { MdAdd, MdHorizontalRule } from 'react-icons/md';

import Modal from '../controls/Modal';
import Textarea from '../controls/Textarea';
import CheckBox from './CheckBox';
import uniqid from 'uniqid';

import {
  setAddQuestionModalOff,
  addToOptions,
  removeFromOptions,
  upDateOptions,
} from '../../features/ui/uiSlice';

const AddQuestionModal = (props) => {
  const dispatch = useDispatch();
  const { optionsData } = useSelector((state) => state.ui);
  const { en, ru } = props;
  const [isChecked, setIsChecked] = useState(null);
  const questionId = uniqid();

  const onSaveQuestion = () => {
    saveCurrentTextareaState();
    const currectAnswers = [];
    optionsData.forEach((element, index) => {
      if (element.id === isChecked) {
        currectAnswers.push(index.toString());
      }
    });
    const result = {
      question: document.getElementById(questionId).value,
      options: [],
      currect: currectAnswers,
    };
    optionsData.forEach((element) => {
      result.options.push(document.getElementById(element.id).value);
    });
    console.log(result);
  };

  // Service function
  const saveCurrentTextareaState = () => {
    optionsData.forEach((element) => {
      dispatch(
        upDateOptions({
          id: element.id,
          defaultValue: document.getElementById(element.id).value,
        })
      );
    });
  };

  const onClose = () => {
    dispatch(setAddQuestionModalOff());
  };

  const onCheckHandler = (id) => {
    saveCurrentTextareaState();
    setIsChecked(id);
  };

  const unCheckHandler = () => {
    saveCurrentTextareaState();
    setIsChecked(null);
  };

  const onPlus = () => {
    saveCurrentTextareaState();
    dispatch(addToOptions());
  };

  const onMinus = () => {
    dispatch(removeFromOptions());
  };

  const list = optionsData.map((element) => {
    return (
      <li style={{ listStyleType: 'none', display: 'flex' }} key={uniqid()}>
        <CheckBox
          style={{ marginTop: '15px' }}
          onCheckHandler={onCheckHandler}
          id={element.id}
          isChecked={isChecked === element.id ? true : false}
          unCheckHandler={unCheckHandler}
        />
        <Textarea
          id={element.id}
          en={en}
          ru={ru}
          onSave={null}
          defaultValue={element.defaultValue}
          maxLength={100}
        />
      </li>
    );
  });

  return (
    <Modal onClose={onClose}>
      <h2>Содерждание вопроса</h2>
      <Textarea en={en} ru={ru} id={questionId} />
      <h3>
        {en ? 'options:' : null} {ru ? 'Варианты ответов:' : null}
      </h3>
      <ul>{list}</ul>
      <ul>{}</ul>
      <IconStyled onClick={onPlus}>
        <MdAdd />
      </IconStyled>
      <IconStyled onClick={onMinus}>
        <MdHorizontalRule />
      </IconStyled>
      <Button onClick={onSaveQuestion}> Save Question</Button>
    </Modal>
  );
};

export default AddQuestionModal;
