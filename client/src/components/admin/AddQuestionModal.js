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

  const [optionslist, setOpitionList] = useState(2);

  const onSave = (data) => {
    console.log('question added', data);
  };
  const onClose = () => {
    dispatch(setAddQuestionModalOff());
  };
  const list = (n) => {
    const result = [];
    let i = 0;
    while (i < n) {
      result.push(
        <li style={{ listStyleType: 'none' }} key={uniqid()}>
          <Textarea en={en} ru={ru} onSave={onSave} maxLength={100} />
        </li>
      );

      i++;
    }
    return result;
  };

  const onAdd = () => setOpitionList(optionslist + 1);
  useEffect(() => {}, []);

  return (
    <Modal onClose={onClose}>
      <h3>options</h3>
      {list(optionslist)}
      <Button onClick={onAdd}>ADD</Button>
      <Button onClick={onSave}>Save Question</Button>
    </Modal>
  );
};

export default AddQuestionModal;
