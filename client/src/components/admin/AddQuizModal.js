import Modal from "../controls/Modal";
import Textarea from "../controls/Textarea";

const AddQuizModal = (props) => {
  const { onClose, onSave, en, ru } = props;
  return (
    <Modal onClose={onClose}>
      <Textarea en={en} ru={ru} onSave={onSave} />
    </Modal>
  );
};

export default AddQuizModal;
