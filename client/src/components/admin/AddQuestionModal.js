import { useState, useEffect, useCallback } from "react";
import { Button } from "../styles/Textarea.styled";
import { useDispatch } from "react-redux";
import { IconStyled } from "../styles/Icon.styled";
import { MdAdd, MdHorizontalRule } from "react-icons/md";

import Modal from "../controls/Modal";
import Textarea from "../controls/Textarea";
import CheckBox from "./CheckBox";
import uniqid from "uniqid";

import { setAddQuestionModalOff } from "../../features/ui/uiSlice";

const AddQuestionModal = (props) => {
  const dispatch = useDispatch();

  const { en, ru } = props;

  const [optionsList, setOpitionsList] = useState([uniqid()]);
  const [isChecked, setIsChecked] = useState(null);
  const questionId = uniqid();

  const onSaveQuestion = () => {
    const result = {
      question: document.getElementById(questionId).value,
      options: [],
      currect: [optionsList.indexOf(isChecked).toString()],
    };

    // isChecked.filter((element, index) => element !== id
    optionsList.forEach((element) => {
      result.options.push(document.getElementById(element).value);
    });
    console.log(result);
  };

  const onClose = () => {
    dispatch(setAddQuestionModalOff());
  };

  const onCheckHandler = useCallback(
    (id, event) => {
      event.preventDefault();
      setIsChecked(id);
    },
    [optionsList]
  );

  const unCheckHandler = useCallback(
    (id, event) => {
      event.preventDefault();
      setIsChecked(null);
    },
    [optionsList]
  );

  const list = optionsList.map((element) => {
    return (
      <li
        style={{ listStyleType: "none", display: "flex", width: "95%" }}
        key={uniqid()}
      >
        <CheckBox
          style={{ marginTop: "6px" }}
          onCheckHandler={onCheckHandler}
          id={element}
          isChecked={isChecked === element ? true : false}
          unCheckHandler={unCheckHandler}
        />
        <Textarea id={element} en={en} ru={ru} onSave={null} maxLength={100} />
      </li>
    );
  });

  const onPlus = () => setOpitionsList([...optionsList, uniqid()]);

  const onMinus = () => {
    if (optionsList.length > 1) {
      setOpitionsList(
        optionsList.filter((element, index, arr) => index !== arr.length - 1)
      );
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Содерждание вопроса</h2>
      <Textarea en={en} ru={ru} id={questionId} />
      <h3>
        {en ? "options:" : null} {ru ? "Варианты ответов:" : null}
      </h3>
      {list}
      <IconStyled>
        <MdAdd onClick={onPlus} />
      </IconStyled>
      <IconStyled>
        <MdHorizontalRule onClick={onMinus} />
      </IconStyled>
      <Button onClick={onSaveQuestion}> Save Question</Button>
    </Modal>
  );
};

export default AddQuestionModal;
