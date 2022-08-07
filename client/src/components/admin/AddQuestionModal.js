import { useDispatch } from 'react-redux';
import Modal from '../controls/Modal';
import Textarea from '../controls/Textarea';

import { setAddQuestionModalOff } from '../../features/ui/uiSlice';

const AddQuestionModal = (props) => {
  const dispatch = useDispatch();

  const { en, ru } = props;

  const onSave = (data) => {
    console.log('question added');
  };
  const onClose = () => {
    dispatch(setAddQuestionModalOff());
  };

  return (
    <Modal onClose={onClose}>
      <Textarea en={en} ru={ru} onSave={onSave} maxLength={100} />
    </Modal>
  );
};

export default AddQuestionModal;
