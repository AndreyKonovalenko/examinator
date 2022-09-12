import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Modal from '../controls/Modal';
import ChangePassForm from './ChangePassFrom';

import { setChangePasswordModalOff } from '../../features/ui/uiSlice';
import { resetUserPassword } from '../../features/auth/authSlice';

const ChangePassModal = () => {
  const dispatch = useDispatch();
  const { ru, en } = useSelector((state) => state.ui);
  const { isSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    password1: '',
  });

  const { currentPassword, password, password1 } = formData;

  const onModalClose = () => {
    dispatch(setChangePasswordModalOff());
  };

  const onChange = (event) => {
    event.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const userData = {
      currentPassword: currentPassword,
      newPassword: password1,
    };
    if (password === password1) {
      dispatch(resetUserPassword(userData));
    }
    // dispatch(login(userData));
  };

  const success = (
    <>
      {ru ? <h2>Вы успешно изменили пороль</h2> : null}
      {en ? <h2>You have successfully changed your password</h2> : null}
    </>
  );

  return (
    <Modal onClose={onModalClose}>
      <ChangePassForm
        onChange={onChange}
        onSubmit={onSubmit}
        ru={ru}
        en={en}
        currentPassword={currentPassword}
        password={password}
        password1={password1}
      />
      {isSuccess ? success : null}
    </Modal>
  );
};

export default ChangePassModal;
