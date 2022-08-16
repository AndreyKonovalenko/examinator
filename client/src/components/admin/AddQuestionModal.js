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
  const [defaultValues, setSetDefaultValues] = useState([]);
  const questionId = uniqid();

  // const onSaveQuestion = () => {\
  //   const result = {
  //     question: document.getElementById(questionId).value,
  //     options: [],
  //     currect: [optionsList.indexOf(isChecked).toString()],
  //   };

  //   // isChecked.filter((element, index) => element !== id
  //   optionsList.forEach((element) => {
  //     result.options.push(document.getElementById(element).value);
  //   });
  //   console.log(result);
  // };

  const onChangeHandler = (event) => {
    event.preventDefault();
    dispatch(upDateOptions({ id: event.target.id, value: event.target.value }));
    console.log(event.target.id, event.target.value);
  };

  const onClose = () => {
    dispatch(setAddQuestionModalOff());
  };

  const onCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked(id);
  };

  const unCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked(null);
  };

  const onPlus = () => {
    optionsData.forEach((element) => {
      console.log(document.getElementById(element.id).value);
      dispatch(
        upDateOptions({
          id: element.id,
          defaultValue: document.getElementById(element.id).value,
        })
      );
    });

    dispatch(addToOptions());
  };

  const onMinus = () => {
    dispatch(removeFromOptions());
  };

  const list = optionsData.map((element) => {
    return (
      <li
        style={{ listStyleType: 'none', display: 'flex', width: '95%' }}
        key={uniqid()}>
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

  // const CheckBoxList = optionsList.map((element) => {
  //   return (
  //     <CheckBox
  //       style={{ marginTop: "6px" }}
  //       onCheckHandler={onCheckHandler}
  //       id={element}
  //       isChecked={isChecked === element ? true : false}
  //       unCheckHandler={unCheckHandler}
  //     />
  //   );
  // });

  useEffect(() => {
    console.log('rereddering Modal');
    console.log(defaultValues);
  }, [defaultValues]);

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
      <Button onClick={() => {}}> Save Question</Button>
    </Modal>
  );
};

export default AddQuestionModal;
