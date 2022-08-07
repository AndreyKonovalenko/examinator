import { useState, useEffect } from 'react';
import { Button } from '../styles/Textarea.styled';
import { useDispatch } from 'react-redux';
import Modal from '../controls/Modal';
import Textarea from '../controls/Textarea';
import uniqid from 'uniqid';

import { setAddQuestionModalOff } from '../../features/ui/uiSlice';

const AddQuestionModal = (props) => {
  const dispatch = useDispatch();

  const { en, ru } = props;

  const [optionsList, setOpitionsList] = useState([uniqid()]);

  const onSaveQuestion = () => {
    const result = [];

    optionsList.forEach((element) => {
      result.push(document.getElementById(element).value);
    });
    console.log(result);
  };
  const onClose = () => {
    dispatch(setAddQuestionModalOff());
  };
  const list = optionsList.map((element) => {
    return (
      <li style={{ listStyleType: 'none' }} key={uniqid()}>
        <Textarea
          id={element}
          en={en}
          ru={ru}
          onSave={() => {}}
          maxLength={100}
        />
      </li>
    );
  });

  const onAdd = () => setOpitionsList([...optionsList, uniqid()]);
  useEffect(() => {}, []);

  return (
    <Modal onClose={onClose}>
      <h3>options</h3>
      {list}
      <Button onClick={onAdd}>ADD</Button>
      <Button onClick={onSaveQuestion}>Save Question</Button>
    </Modal>
  );
};

export default AddQuestionModal;
