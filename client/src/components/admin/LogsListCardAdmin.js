import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import moment from 'moment';

import { deleteLog } from '../../features/admin/adminSlice';
import { getLogById } from '../../features/log/logSlice';
import { ListElem } from '../styles/ListElem.styled';
import { setLogsTabOff } from '../../features/ui/uiSlice';
import { StyledListCard } from '../styles/ListCard.styled';
import { StyledSeparator } from '../styles/Separator.styled';
import { toast } from 'react-toastify';
import CheckBox from './CheckBox';
import SettingPanel from './SettingsPanel';
// import theme from '../../theme/index.js';
import uniqid from 'uniqid';

const LogsListCardAdmin = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { en, item, ru } = props;
  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // List Hadlers

  const onClickHandler = (id, event) => {
    event.preventDefault();
    setIsSelected(id);
    dispatch(getLogById(id));
    navigate('/summary');
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

  // const onAddHandler = () => {
  //   dispatch(());
  // };

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
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.answers.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format('HH:mm:ss/DD.MM.YYYY');

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
            <p style={score >= 80 ? success : fail}>
              Тест {score >= 80 ? 'пройден успешно' : 'провален'} с результатом{' '}
              {score}%, правильных ответов: {element.result} из{' '}
              {element.answers.length}
            </p>
          ) : null}
          {en ? (
            <p style={score >= 80 ? success : fail}>
              {score >= 80 ? 'You have succeeded' : 'You have failed'} with{' '}
              {score}%, correct answers: {element.result} out of{' '}
              {element.answers.length}
            </p>
          ) : null}
          <p>{etemptTime}</p>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        hideAdd
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
