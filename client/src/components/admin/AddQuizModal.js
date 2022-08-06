import { useDispatch } from 'react-redux';
import Modal from '../controls/Modal';
import Textarea from '../controls/Textarea';

import { addQuiz } from '../../features/admin/adminSlice';
import { setAddQuizModalOff } from '../../features/ui/uiSlice';

const AddQuizModal = (props) => {
  const dispatch = useDispatch();

  const { en, ru } = props;

  const onSave = (data) => {
    dispatch(addQuiz(data));
  };
  const onClose = () => {
    dispatch(setAddQuizModalOff());
  };

  return (
    <Modal onClose={onClose}>
      <Textarea en={en} ru={ru} onSave={onSave} maxLength={100} />
    </Modal>
  );
};

export default AddQuizModal;
