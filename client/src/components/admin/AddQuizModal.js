import { useDispatch } from 'react-redux';
import Modal from '../controls/Modal';
import Textarea from '../controls/Textarea';
import uniqid from 'uniqid';

import { addQuiz } from '../../features/admin/adminSlice';
import { setAddQuizModalOff } from '../../features/ui/uiSlice';

const AddQuizModal = (props) => {
  const dispatch = useDispatch();
  const id = uniqid();

  const { en, ru } = props;

  const onSave = () => {
    dispatch(addQuiz({ title: document.getElementById(id).value }));
  };
  const onClose = () => {
    dispatch(setAddQuizModalOff());
  };

  return (
    <Modal onClose={onClose}>
      <h2>
        {ru ? 'Задайте тему теста' : null}
        {en ? 'Enter new quiz topic' : null}
      </h2>
      <Textarea
        id={id}
        save={true}
        en={en}
        ru={ru}
        onSave={onSave}
        maxLength={100}
      />
    </Modal>
  );
};

export default AddQuizModal;
