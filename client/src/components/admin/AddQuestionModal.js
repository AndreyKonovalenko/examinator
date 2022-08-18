import { useState } from 'react';
import { Button } from '../styles/Textarea.styled';
import { useDispatch, useSelector } from 'react-redux';
import { IconStyled } from '../styles/Icon.styled';
import { MdAdd, MdHorizontalRule } from 'react-icons/md';
import { Li } from '../styles/Modal.styled';

import Modal from '../controls/Modal';
import Textarea from '../controls/Textarea';
import CheckBox from './CheckBox';
import uniqid from 'uniqid';
import theme from '../../theme';

import {
  setAddQuestionModalOff,
  addToOptions,
  removeFromOptions,
  upDateOptions,
  resetOptionsData,
} from '../../features/ui/uiSlice';

import { createAndAddQuestionToQuiz } from '../../features/admin/adminSlice';

const AddQuestionModal = (props) => {
  const dispatch = useDispatch();
  const { quiz } = useSelector((state) => state.admin);
  const { optionsData } = useSelector((state) => state.ui);
  const { en, ru } = props;
  const { _id } = quiz;
  const [isChecked, setIsChecked] = useState(null);
  const questionId = uniqid();

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

  // handlers

  const onSaveQuestion = () => {
    saveCurrentTextareaState();
    const currectAnswers = [];
    optionsData.forEach((element, index) => {
      if (element.id === isChecked) {
        currectAnswers.push((index + 1).toString());
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
    dispatch(createAndAddQuestionToQuiz({ id: _id, questionData: result }));
  };

  const onClose = () => {
    dispatch(setAddQuestionModalOff());
    dispatch(resetOptionsData());
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
    const { id, defaultValue } = element;
    return (
      <Li key={uniqid()}>
        <CheckBox
          style={{ marginTop: '14px' }}
          onCheckHandler={onCheckHandler}
          id={id}
          isChecked={isChecked === id ? true : false}
          unCheckHandler={unCheckHandler}
        />
        <Textarea
          id={id}
          en={en}
          ru={ru}
          styleOption={{ width: '100%' }}
          onSave={null}
          defaultValue={defaultValue}
          maxLength={100}
        />
      </Li>
    );
  });

  return (
    <Modal onClose={onClose}>
      <h2>
        {en ? 'Question:' : null} {ru ? 'Вопрос:' : null}
      </h2>
      <Textarea en={en} ru={ru} id={questionId} />
      <h3>
        {en ? 'options:' : null} {ru ? 'Варианты ответов:' : null}
      </h3>
      {list}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <IconStyled
          onClick={onPlus}
          bg={theme.colors.surface}
          color={theme.colors.primary.light}>
          <MdAdd size={'2rem'} />
        </IconStyled>
        <IconStyled
          onClick={onMinus}
          bg={theme.colors.surface}
          color={theme.colors.primary.light}>
          <MdHorizontalRule size={'2rem'} />
        </IconStyled>
      </div>
      <Button
        style={{ margin: 'auto ', fontSize: '1.5rem' }}
        onClick={onSaveQuestion}>
        {en ? 'Save Question' : null}
        {ru ? 'Сохранить вопрос' : null}
      </Button>
    </Modal>
  );
};

export default AddQuestionModal;
