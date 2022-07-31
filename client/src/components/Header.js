import { StyledHeader, Nav, UL, Logo } from './styles/Header.styled';
import {
  MdAdminPanelSettings,
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
  setDropDownOn,
  setDropDownOff,
  resetUiState,
  setChangePasswordModalOn,
} from '../features/ui/uiSlice';

import DropdownMenu from './controls/DropdownMenu';
import NavItem from './controls/NavItem';
import OutsideClickEscHandler from './OutsideClickEscHandler';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { dropDown, en, ru } = useSelector((state) => state.ui);
  const { logs } = useSelector((state) => state.log);
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetLogState());
    dispatch(resetQuizState());
    dispatch(resetAdminState());
    dispatch(reset());
    dispatch(resetUiState());
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
  const onProfile = () => {
    if (dropDown) {
      dispatch(setDropDownOff());
    }
    if (!dropDown) {
      dispatch(setDropDownOn());
    }
  };
  const onOutSideClick = () => {
    dispatch(setDropDownOff());
  };

  const onChangePassword = () => {
    dispatch(setChangePasswordModalOn());
  };

  let adimnPanel = null;

  if (user) {
    if (user.admin) {
      adimnPanel = (
        <>
          {location.pathname === '/admin' ? (
            <>
              <NavItem onClickHandler={onUserTab}>
                <MdPeopleAlt size={'3em'} />
              </NavItem>
              <NavItem onClickHandler={onQuizzesTab}>
                <MdQuiz size={'3em'} />
              </NavItem>
            </>
          ) : (
            <NavItem onClickHandler={onAdmin}>
              <MdAdminPanelSettings size={'3em'} />
            </NavItem>
          )}
        </>
      );
    }
  }

  const header = (
    <StyledHeader>
      <Nav>
        <UL>
          <NavItem
            onClickHandler={location.pathname !== '/' ? onDashboard : () => {}}>
            <Logo>Examinator</Logo>
          </NavItem>
        </UL>
        <UL>
          {location.pathname !== '/' && location.pathname !== '/login' ? (
            <NavItem onClickHandler={onDashboard}>
              <MdMenu size={'3em'} />
            </NavItem>
          ) : null}
          {adimnPanel}
          <NavItem onClickHandler={onRu}>
            <span
              style={{
                fontSize: '1.5em',
                fontWeight: 'bold',
              }}>
              RU
            </span>
          </NavItem>
          <NavItem onClickHandler={onEn}>
            <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>EN</span>
          </NavItem>
          {user ? (
            <>
              {dropDown ? (
                <NavItem
                  onClickHandler={onProfile}
                  outside={
                    <OutsideClickEscHandler clickHandler={onOutSideClick}>
                      <DropdownMenu
                        en={en}
                        ru={ru}
                        onCP={onChangePassword}
                        onLogout={onLogout}
                        username={user.username}
                        name={user.name}
                        stats={logs ? logs.length : null}
                      />
                    </OutsideClickEscHandler>
                  }>
                  <MdPersonOutline size={'3em'} />
                </NavItem>
              ) : (
                <NavItem onClickHandler={onProfile}>
                  <MdPersonOutline size={'3em'} />
                </NavItem>
              )}
            </>
          ) : null}
        </UL>
      </Nav>
    </StyledHeader>
  );
  return header;
};
export default Header;
