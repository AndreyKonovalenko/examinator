import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import uniqid from 'uniqid';
import CheckBox from './CheckBox';
import SettingPanel from './SettingsPanel';
import { useTheme } from 'styled-components';
import { ListElem } from '../styles/ListElem.styled';
import { setLogsTabOff } from '../../features/ui/uiSlice';
import { StyledListCard } from '../styles/ListCard.styled';
import { StyledSeparator } from '../styles/Separator.styled';

import { deleteLog } from '../../features/adminLogs/adminLogsSlice';
import { getLogById } from '../../features/log/logSlice';
import { getFullUserLog } from '../../features/adminFullUserLog/adminFullUserLogSlice';

import { updatedAtParser, dateCompare } from '../../utils/dateUtils';
import { scoreCulc } from '../../utils/scoreCulc';

import { setAnswersHistoryModalOn } from '../../features/ui/uiSlice';

const LogsListCardAdmin = (props) => {
  const theme = useTheme();
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const { en, item, ru } = props;
  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const onClickHandler = (id, event) => {
    event.preventDefault();
    setIsSelected(id);
    dispatch(getFullUserLog(id));
    dispatch(getLogById(id));
    dispatch(setAnswersHistoryModalOn());
    //  navigate('/summary');
  };

  const onCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked([...isChecked, id]);
  };

  const unCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked(isChecked.filter((element) => element !== id));
  };

  // Settings Panel Handlers

  const onCloseHandler = () => {
    dispatch(setLogsTabOff());
  };

  const onGearHandler = () => {
    if (item.length === 0) {
      toast.error('Nothing to edit');
    }
    if (item.length > 0) {
      setIsEdit(!isEdit);
    }
  };

  const onDeleteHandler = () => {
    if (isChecked.length > 0) {
      for (const element of isChecked) {
        dispatch(deleteLog(element));
      }
    } else {
      toast.error('You try to delete empty or not selected logs!');
    }
  };

  const list = item.map((element, index) => {
    if (element.quiz === null) {
      return (
        <div style={{ display: 'flex' }} key={uniqid()}>
          {isEdit ? (
            <CheckBox
              onCheckHandler={onCheckHandler}
              id={element._id}
              isChecked={isChecked.includes(element._id) ? true : false}
              unCheckHandler={unCheckHandler}
            />
          ) : null}
          <ListElem
            key={uniqid()}
            onClick={(event) => onClickHandler(element._id, event)}>
            <h2>
              {en ? 'Quiz has been deleted' : null}
              {ru ? 'Тест был дулаент из системы' : null}
            </h2>
          </ListElem>
        </div>
      );
    }
    const score = scoreCulc(element.result, element.answers);
    const etemptTime = updatedAtParser(element.updatedAt);
    const lastQuizUpdate = updatedAtParser(element.quiz.updatedAt);
    const comparedDates = dateCompare(
      element.updatedAt,
      element.quiz.updatedAt
    );
    const success = {
      color: theme.colors.primary.light,
    };

    const fail = {
      color: theme.colors.error,
    };

    return (
      <div style={{ display: 'flex' }} key={uniqid()}>
        {isEdit ? (
          <CheckBox
            onCheckHandler={onCheckHandler}
            id={element._id}
            isChecked={isChecked.includes(element._id) ? true : false}
            unCheckHandler={unCheckHandler}
          />
        ) : null}

        <ListElem
          key={uniqid()}
          onClick={(event) => onClickHandler(element._id, event)}
          style={
            index === isSelected
              ? {
                  backgroundColor: theme.colors.primary.main,
                  color: theme.colors.text.onPrimary,
                }
              : null
          }>
          {ru ? <p>Тема: {element.title}</p> : null}
          {en ? <p>Quiz: {element.title}</p> : null}
          {ru ? (
            <p style={score >= element.threshold ? success : fail}>
              Тест {score >= element.threshold ? 'пройден успешно' : 'провален'}{' '}
              с результатом {score}%, правильных ответов: {element.result} из{' '}
              {element.answers.length}
            </p>
          ) : null}
          {en ? (
            <p style={score >= element.threshold ? success : fail}>
              {score >= element.threshold
                ? 'You have succeeded'
                : 'You have failed'}{' '}
              with {score}%, correct answers: {element.result} out of{' '}
              {element.answers.length}
            </p>
          ) : null}
          <p>{etemptTime}</p>
          <p style={comparedDates ? success : fail}>
            {en
              ? comparedDates
                ? 'Relevant'
                : `Irrelevant, quiz last update at ${lastQuizUpdate}`
              : null}
            {ru
              ? comparedDates
                ? 'Актуальный результат'
                : `Результат устарел, структура опроса изменена позднее даты попытки: ${lastQuizUpdate}`
              : null}
          </p>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        hideAdd
        hideUnArchive
        isEdit={isEdit}
        onAdd={() => {}}
        onClose={onCloseHandler}
        onDelete={onDeleteHandler}
        onSettings={onGearHandler}
      />
      <StyledSeparator />
      {ru ? <h2>История:</h2> : null}
      {en ? <h2>User history:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default LogsListCardAdmin;
