import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DropdownMenu from "./controls/DropdownMenu";
import NavItem from "./controls/NavItem";
import OutsideClickEscHandler from "./controls/OutsideClickEscHandler";

import { logout, reset } from "../features/auth/authSlice";
import { resetLogState } from "../features/log/logSlice";
import { resetLogsState } from "../features/logs/logsSlice";
import { resetQuizState } from "../features/quiz/quizSlice";
import { resetQuizzesState } from "../features/quizzes/quizzesSlice";
import { resetAdminLogsState } from "../features/adminLogs/adminLogsSlice";
import { resetAdminQuizState } from "../features/adminQuiz/adminQuizSlice";
import { resetAdminQuizzesState } from "../features/adminQuizzes/adminQuizzesSlice";
import { resetAdminUsersState } from "../features/adminUsers/adminUsersSlice";
import { resetAdminQuestionState } from "../features/adminQuestion/adminQuiestionSlice";

import {
  setRu,
  setEn,
  setUsersTabOn,
  setQuizzesTabOn,
  setDropDownOn,
  setDropDownOff,
  resetUiState,
  setChangePasswordModalOn,
} from "../features/ui/uiSlice";

import { StyledHeader, Nav, UL, Logo } from "./styles/Header.styled";
import {
  MdAdminPanelSettings,
  MdMenu,
  MdPeopleAlt,
  MdPersonOutline,
  MdQuiz,
} from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { dropDown, en, ru } = useSelector((state) => state.ui);
  const { logs } = useSelector((state) => state.logs);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetLogState());
    dispatch(resetLogsState());
    dispatch(resetQuizState());
    dispatch(resetQuizzesState());
    dispatch(resetAdminLogsState());
    dispatch(resetAdminQuizState());
    dispatch(resetAdminQuizzesState());
    dispatch(resetAdminUsersState());
    dispatch(resetAdminQuestionState());
    dispatch(resetUiState());
    navigate("/login");
  };

  const onDashboard = () => {
    dispatch(resetLogsState());
    dispatch(resetQuizState());
    navigate("/");
  };
  const onAdmin = () => {
    navigate("/admin");
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
          {location.pathname === "/admin" ? (
            <>
              <NavItem onClickHandler={onUserTab}>
                <MdPeopleAlt size={"3em"} />
              </NavItem>
              <NavItem onClickHandler={onQuizzesTab}>
                <MdQuiz size={"3em"} />
              </NavItem>
            </>
          ) : (
            <NavItem onClickHandler={onAdmin}>
              <MdAdminPanelSettings size={"3em"} />
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
            onClickHandler={location.pathname !== "/" ? onDashboard : () => {}}
          >
            <Logo>Examinator</Logo>
          </NavItem>
        </UL>
        <UL>
          <NavItem onClickHandler={onRu}>
            <span
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
              }}
            >
              RU
            </span>
          </NavItem>
          <NavItem onClickHandler={onEn}>
            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>EN</span>
          </NavItem>
          {location.pathname !== "/" && location.pathname !== "/login" ? (
            <NavItem onClickHandler={onDashboard}>
              <MdMenu size={"3em"} />
            </NavItem>
          ) : null}
          {adimnPanel}
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
                        user={user}
                        stats={logs ? logs.length : null}
                      />
                    </OutsideClickEscHandler>
                  }
                >
                  <MdPersonOutline size={"3em"} />
                </NavItem>
              ) : (
                <NavItem onClickHandler={onProfile}>
                  <MdPersonOutline size={"3em"} />
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
