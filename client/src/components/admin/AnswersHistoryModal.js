import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import uniqid from "uniqid";
import Bage from "../controls/Bage";
import { ListElem } from "../styles/ListElem.styled";
import Modal from "../controls/Modal";

import { setAnswersHistoryModalOff } from "../../features/ui/uiSlice";
import { resetAdminFullUserLogState } from "../../features/adminFullUserLog/adminFullUserLogSlice";

const AnswersHistoryModal = (props) => {
  const dispatch = useDispatch();
  const { fullUserLog } = useSelector((state) => state.adminFullUserLog);
  const theme = useTheme();
  const { en, ru } = props;

  const onClose = () => {
    dispatch(setAnswersHistoryModalOff());
    dispatch(resetAdminFullUserLogState());
  };

  const list = fullUserLog.answers.map((element) => {
    const optionList = element.question.options.map((el, index) => {
      let styled = null;
      if (index === parseInt(element.question.currect)) {
        styled = { color: theme.colors.primary.light };
      }
      if (
        index === parseInt(element.answer[0]) &&
        parseInt(element.answer[0]) !== parseInt(element.question.currect)
      ) {
        styled = { color: theme.colors.error };
      }

      return (
        <li key={uniqid()} style={styled}>
          {el}
        </li>
      );
    });
    return (
      <div style={{ display: "flex" }} key={uniqid()}>
        <ListElem key={uniqid()}>
          {element.question.question}
          <ul>{optionList}</ul>
        </ListElem>
      </div>
    );
  });

  let textInjection;
  if (en) {
    textInjection = "Threshold: ";
  }
  if (ru) {
    textInjection = "Порог: ";
  }

  return (
    <Modal onClose={onClose}>
      <h2>
        <Bage text={`${textInjection}${fullUserLog.threshold} %`} />
        {ru && "Тема: "}
        {en && "Topic: "}
        {fullUserLog.title}

        {}
      </h2>
      {list}
    </Modal>
  );
};

export default AnswersHistoryModal;
