import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { Container } from './styles/Container.styled';
import { StyledHeader, StyledNav } from './styles/Header.styled';
import { Button } from './styles/Button.styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { resetLogState } from '../features/log/logSlice';
import { resetQuizState } from '../features/quiz/quizSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetLogState());
    dispatch(resetQuizState());
    dispatch(reset());
    navigate('/login');
  };

  const onDashboard = () => {
    dispatch(resetLogState());
    dispatch(resetQuizState());
    navigate('/');
  };
  useEffect(() => {
    if (user) {
      const decoded = jwt_decode(user.token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(logout());
        dispatch(reset());
        dispatch(resetLogState());
        dispatch(resetQuizState());
        navigate('/login');
      }
    }
  });

  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <h1>Examinator</h1>
          {location.pathname === '/summary' ? (
            <Button onClick={onDashboard}>Dashboard</Button>
          ) : null}
          {user ? <Button onClick={onLogout}>Logout</Button> : null}
        </StyledNav>
      </Container>
    </StyledHeader>
  );
};
export default Header;
