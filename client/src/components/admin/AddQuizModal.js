import { useDispatch } from "react-redux";
import Modal from "../controls/Modal";
import Textarea from "../controls/Textarea";

import { addQuiz } from "../../features/admin/adminSlice";

const AddQuizModal = (props) => {
  const dispatch = useDispatch();

  const { onClose, en, ru } = props;

  const onSave = (data) => {
    dispatch(addQuiz(data));
  };

  return (
    <Modal onClose={onClose}>
      <Textarea en={en} ru={ru} onSave={onSave} maxLength={100} />
    </Modal>
  );
};

export default AddQuizModal;
