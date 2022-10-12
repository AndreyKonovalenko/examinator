import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import uniqid from 'uniqid';
import { ListElem } from '../styles/ListElem.styled';
import Modal from '../controls/Modal';

import { setAnswersHistoryModalOff } from '../../features/ui/uiSlice';
import { getQuestion } from '../../features/adminQuestion/adminQuiestionSlice';
import { getFullUserLog } from '../../features/adminFullUserLog/adminFullUserLogSlice';

const AnswersHistoryModal = (props) => {
  const dispatch = useDispatch();
  const { log } = useSelector((state) => state.log);
  const { questionData, isSuccess } = useSelector(
    (state) => state.adminQuestion
  );
  const theme = useTheme();
  const { en, ru } = props;
  // cosnt[(i, setI)] = us;
  // const [answers, setAnswers] = useState([]);

  // handlers

  const onClose = () => {
    dispatch(setAnswersHistoryModalOff());
  };

  // useEffect(() => {
  //   if()
  //       dispatch(getQuestion(element.qId));
  //     }
  //   }
  //   if (questionData) {
  //     setAnswers((prevState) => [...prevState, questionData]);
  //   }
  //   console.log(answers);
  // }, [answers, dispatch, log.answers, questionData]);

  const list = log.answers.map((element) => {
    // const optionList = element.options.map((el, index) => (
    // <li
    //   key={uniqid()}
    //   style={
    //     index === parseInt(element.currect)
    //       ? { color: theme.colors.primary.light }
    //       : null
    //   }>
    //   {el}
    // </li>
    // ));
    return (
      <div style={{ display: 'flex' }} key={uniqid()}>
        <ListElem key={uniqid()}>
          {element.answer}
          {/* <ul>{optionList}</ul> */}
        </ListElem>
      </div>
    );
  });

  return (
    <Modal onClose={onClose}>
      <h2>
        {ru && 'Tема: '}
        {en && 'Topic: '}
        {log.title}
      </h2>
    </Modal>
  );
};

export default AnswersHistoryModal;
