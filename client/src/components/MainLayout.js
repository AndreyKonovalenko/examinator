import React from 'react';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { StyledMainLayout } from './styles/MainLayout.styled';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { resetLogState, resetAnswersLogState } from '../features/log/logSlice';
import { resetQuizState } from '../features/quiz/quizSlice';
import { resetUiState, setModalOff } from '../features/ui/uiSlice';
import { IconContext } from 'react-icons';

import Error from '../components/Error.js';
import Header from './Header';
import Footer from './Footer.js';
import Modal from './controls/Modal.js';

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { modal } = useSelector((state) => state.ui);

  const onModalClose = () => {
    dispatch(setModalOff());
  };

  useEffect(() => {
    console.log(modal);
    if (user) {
      const decoded = jwt_decode(user.token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(logout());
        dispatch(reset());
        dispatch(resetLogState());
        dispatch(resetQuizState());
        dispatch(resetAnswersLogState());
        dispatch(resetUiState());
        navigate('/login');
      }
    }
  }, [user, dispatch, navigate]);
  return (
    <>
      <IconContext.Provider
        value={{ style: { verticalAlign: 'middle', alignSelf: 'center' } }}>
        <Header />
        <Error />
        {modal ? <Modal onClose={onModalClose} /> : null}
        <StyledMainLayout>
          <Outlet />
        </StyledMainLayout>
        <Footer />
      </IconContext.Provider>
    </>
  );
};

export default MainLayout;
