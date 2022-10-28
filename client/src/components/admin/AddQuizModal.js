import { useDispatch } from "react-redux";
import uniqid from "uniqid";
import Modal from "../controls/Modal";
import { Button } from "../styles/Textarea.styled";
import Textarea from "../controls/Textarea";

import { addQuiz } from "../../features/adminQuizzes/adminQuizzesSlice";
import { setAddQuizModalOff } from "../../features/ui/uiSlice";

const AddQuizModal = (props) => {
  const dispatch = useDispatch();
  const idTittle = uniqid();
  const idThreshold = uniqid();

  const { en, ru } = props;

  const onSave = () => {
    const title = document.getElementById(idTittle).value;
    const threshold = parseInt(document.getElementById(idThreshold).value);
    dispatch(
      addQuiz({
        title: title,
        threshold: threshold,
      })
    );
    dispatch(setAddQuizModalOff());
  };
  const onClose = () => {
    dispatch(setAddQuizModalOff());
  };

  return (
    <Modal onClose={onClose}>
      <h3>
        {ru && "Задайте тему теста"}
        {en && "Enter new quiz topic"}
      </h3>
      <Textarea id={idTittle} en={en} ru={ru} maxLength={100} />
      <h3>
        {ru &&
          "Введите порог прохождения в процентах (допустимы значения от 0 до 100)"}
        {en &&
          "Enter the pass threshold as a percentage (valid values are from 0 to 100"}
      </h3>
      <Textarea id={idThreshold} en={en} ru={ru} maxLength={3} />
      <Button style={{ margin: "auto ", fontSize: "1.5rem" }} onClick={onSave}>
        {en ? "Save" : null}
        {ru ? "Сохранить" : null}
      </Button>
    </Modal>
  );
};

export default AddQuizModal;
