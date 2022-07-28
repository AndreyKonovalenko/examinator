import { StyledHeader, Nav, UL, Logo } from "./styles/Header.styled";
import {
  MdAdminPanelSettings,
  MdLogout,
  MdMenu,
  MdPeopleAlt,
  MdPersonOutline,
  MdQuiz,
} from "react-icons/md";

import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { resetLogState } from "../features/log/logSlice";
import { resetQuizState } from "../features/quiz/quizSlice";
import { resetAdminState } from "../features/admin/adminSlice";
import {
  setRu,
  setEn,
  setUsersTabOn,
  setQuizzesTabOn,
  setDropDownOn,
  setDropDownOff,
} from "../features/ui/uiSlice";

import DropdownMenu from "./DropdownMenu";
import NavItem from "./controllers/NavItem";
import OutsideClickEscHandler from "./OutsideClickEscHandler";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { dropDown } = useSelector((state) => state.ui);
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetLogState());
    dispatch(resetQuizState());
    dispatch(resetAdminState());
    dispatch(reset());
    navigate("/login");
  };

  const onDashboard = () => {
    dispatch(resetLogState());
    dispatch(resetQuizState());
    dispatch(resetAdminState());
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
    console.log("onProfile clicked");
    if (!dropDown) {
      console.log("on");
      dispatch(setDropDownOn());
    }
    if (dropDown) {
      console.log("off");
      dispatch(setDropDownOff());
    }
  };
  const onOutsideClickHandler = () => {
    dispatch(setDropDownOff());
  };
  let adimnPanel = null;

  const mq = {
    "@media (max-width: 500px)": {
      display: "none",
    },
  };

  if (user) {
    if (user.admin) {
      adimnPanel = (
        <>
          <NavItem onClickHandler={onAdmin}>
            <MdAdminPanelSettings size={"3em"} />
          </NavItem>
          {location.pathname === "/admin" ? (
            <>
              <NavItem onClickHandler={onUserTab}>
                <MdPeopleAlt size={"3em"} />
              </NavItem>
              <NavItem onClickHandler={onQuizzesTab}>
                <MdQuiz size={"3em"} />
              </NavItem>
            </>
          ) : null}
        </>
      );
    }
  }

  //${theme.mobile}

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
          {location.pathname !== "/" && location.pathname !== "/login" ? (
            <NavItem onClickHandler={onDashboard}>
              <MdMenu size={"3em"} />
            </NavItem>
          ) : null}
          {adimnPanel}
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
          {user ? (
            <>
              {dropDown ? (
                <OutsideClickEscHandler clickHandler={onOutsideClickHandler}>
                  <NavItem
                    onClickHandler={onProfile}
                    outside={<DropdownMenu />}
                  >
                    <MdPersonOutline size={"3em"} />
                  </NavItem>
                </OutsideClickEscHandler>
              ) : (
                <NavItem onClickHandler={onProfile}>
                  <MdPersonOutline size={"3em"} />
                </NavItem>
              )}

              <NavItem onClickHandler={onLogout}>
                <MdLogout size={"3em"} />
              </NavItem>
            </>
          ) : null}
        </UL>
      </Nav>
    </StyledHeader>
  );
  return header;
};
export default Header;
