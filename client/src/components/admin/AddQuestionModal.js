import { useState, useEffect } from "react";
import { Button } from "../styles/Textarea.styled";
import { useDispatch, useSelector } from "react-redux";
import { IconStyled } from "../styles/Icon.styled";
import { MdAdd, MdHorizontalRule } from "react-icons/md";

import Modal from "../controls/Modal";
import Textarea from "../controls/Textarea";
import CheckBox from "./CheckBox";
import uniqid from "uniqid";

import {
  setAddQuestionModalOff,
  addToOptions,
  removeFromOptions,
} from "../../features/ui/uiSlice";

const AddQuestionModal = (props) => {
  const dispatch = useDispatch();
  const { optionsData } = useSelector((state) => state.ui);

  const { en, ru } = props;

  const [isChecked, setIsChecked] = useState(null);
  const questionId = uniqid();

  // const onSaveQuestion = () => {
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
    dispatch(addToOptions());
  };

  const onMinus = (id) => {
    dispatch(removeFromOptions(id));
  };

  const list = optionsData.map((element) => {
    return (
      <li
        style={{ listStyleType: "none", display: "flex", width: "95%" }}
        key={uniqid()}
      >
        <Textarea
          id={element.id}
          en={en}
          ru={ru}
          onSave={null}
          maxLength={100}
          value={element.value}
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

  return (
    <Modal onClose={onClose}>
      <h2>Содерждание вопроса</h2>
      <Textarea en={en} ru={ru} id={questionId} />
      <h3>
        {en ? "options:" : null} {ru ? "Варианты ответов:" : null}
      </h3>
      <ul>{list}</ul>
      <ul>{}</ul>
      <IconStyled>
        <MdAdd onClick={onPlus} />
      </IconStyled>
      <IconStyled>
        <MdHorizontalRule onClick={onMinus} />
      </IconStyled>
      <Button onClick={() => {}}> Save Question</Button>
    </Modal>
  );
};

export default AddQuestionModal;
