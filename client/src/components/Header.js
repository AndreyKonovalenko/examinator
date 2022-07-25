import { Container } from "./styles/Container.styled";
import { StyledHeader, StyledNav } from "./styles/Header.styled";
import { IconStyled } from "./styles/Icon.styled";
import {
  MdLogout,
  MdMenu,
  MdAdminPanelSettings,
  MdPeopleAlt,
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
} from "../features/ui/uiSlice";

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

  let adimnPanel = null;
  if (user) {
    if (user.admin) {
      adimnPanel = (
        <>
          <IconStyled onClick={onAdmin}>
            <MdAdminPanelSettings size={"3em"} />
          </IconStyled>

          {location.pathname === "/admin" ? (
            <>
              <IconStyled onClick={onUserTab}>
                <MdPeopleAlt size={"3em"} />
              </IconStyled>
              <IconStyled onClick={onQuizzesTab}>
                <MdQuiz size={"3em"} />
              </IconStyled>{" "}
            </>
          ) : null}
        </>
      );
    }
  }
  const header = (
    <StyledHeader>
      <Container>
        <StyledNav>
          <IconStyled onClick={location.pathname !== "/" ? onDashboard : null}>
            <span style={{ fontSize: "2em", fontWeight: "bold" }}>
              Examinator
            </span>
          </IconStyled>
          {location.pathname !== "/" && location.pathname !== "/login" ? (
            <>
              <IconStyled onClick={onDashboard}>
                <MdMenu size={"3em"} />
              </IconStyled>
            </>
          ) : null}
          {adimnPanel}
          <div style={{ marginLeft: "auto" }}>
            <IconStyled onClick={onRu}>
              <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>RU</span>
            </IconStyled>
            /
            <IconStyled onClick={onEn}>
              <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>EN</span>
            </IconStyled>
            {user ? (
              <IconStyled onClick={onLogout}>
                <MdLogout size={"3em"} />
              </IconStyled>
            ) : null}{" "}
          </div>
        </StyledNav>
      </Container>
    </StyledHeader>
  );
  return header;
};
export default Header;
