import { StyledHeader, StyledNav } from './styles/Header.styled';
import { IconStyled } from './styles/Icon.styled';
import {
  MdAdminPanelSettings,
  MdLogout,
  MdMenu,
  MdPeopleAlt,
  MdPersonOutline,
  MdQuiz,
} from 'react-icons/md';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { resetLogState } from '../features/log/logSlice';
import { resetQuizState } from '../features/quiz/quizSlice';
import { resetAdminState } from '../features/admin/adminSlice';
import {
  setRu,
  setEn,
  setUsersTabOn,
  setQuizzesTabOn,
} from '../features/ui/uiSlice';

import DropdownMenu from './DropdownMenu';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetLogState());
    dispatch(resetQuizState());
    dispatch(resetAdminState());
    dispatch(reset());
    navigate('/login');
  };

  const onDashboard = () => {
    dispatch(resetLogState());
    dispatch(resetQuizState());
    dispatch(resetAdminState());
    navigate('/');
  };
  const onAdmin = () => {
    navigate('/admin');
  };
  const onRu = () => {
    dispatch(setRu());
  };
  const onEn = () => {
    dispatch(setEn());
  };
  const onUserTab = () => {
    dispatch(setUsersTabOn());
  };
  const onQuizzesTab = () => {
    dispatch(setQuizzesTabOn());
  };

  const onProfile = () => {};
  let adimnPanel = null;
  if (user) {
    if (user.admin) {
      adimnPanel = (
        <>
          <li>
            <IconStyled onClick={onAdmin}>
              <MdAdminPanelSettings size={'3em'} />
            </IconStyled>
          </li>
          {location.pathname === '/admin' ? (
            <>
              <li>
                <IconStyled onClick={onUserTab}>
                  <MdPeopleAlt size={'3em'} />
                </IconStyled>
              </li>
              <li>
                <IconStyled onClick={onQuizzesTab}>
                  <MdQuiz size={'3em'} />
                </IconStyled>{' '}
              </li>
            </>
          ) : null}
        </>
      );
    }
  }
  const header = (
    <StyledHeader>
      <div style={{ flexGrow: 1 }}>
        <IconStyled onClick={location.pathname !== '/' ? onDashboard : null}>
          <span style={{ fontSize: '2em', fontWeight: 'bold' }}>
            Examinator
          </span>
        </IconStyled>
      </div>
      <nav style={{ flexGrow: 4 }}>
        <ul style={{ justifyContent: 'flex-start' }}>
          {location.pathname !== '/' && location.pathname !== '/login' ? (
            <li>
              <IconStyled onClick={onDashboard}>
                <MdMenu size={'3em'} />
              </IconStyled>
            </li>
          ) : null}
          {adimnPanel}
        </ul>
        <ul>
          <li>
            <div style={{ margin: 'auto' }}>
              <IconStyled onClick={onRu}>
                <span
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                  }}>
                  RU
                </span>
              </IconStyled>
            </div>
          </li>
          <li>
            <IconStyled onClick={onEn}>
              <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>EN</span>
            </IconStyled>
          </li>
          {user ? (
            <>
              <li>
                <IconStyled>
                  <MdPersonOutline size={'3em'} />
                </IconStyled>
                <DropdownMenu />
              </li>
              <li>
                <IconStyled onClick={onLogout}>
                  <MdLogout size={'3em'} />
                </IconStyled>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </StyledHeader>
  );
  return header;
};
export default Header;
