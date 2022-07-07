import { Container } from "./styles/Container.styled";
import { StyledHeader, StyledNav } from "./styles/Header.styled";
import { IconStyled } from "./styles/Icon.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { resetLogState } from "../features/log/logSlice";
import { resetQuizState } from "../features/quiz/quizSlice";
import { resetAdminState } from "../features/admin/adminSlice";
import { MdLogout, MdMenu, MdAdminPanelSettings } from "react-icons/md";

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
  let adimnIcon = null;
  if (user) {
    if (user.admin) {
      adimnIcon = (
        <>
          <IconStyled onClick={onAdmin}>
            <MdAdminPanelSettings size={"3em"} />
          </IconStyled>
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
          {adimnIcon}
          {user ? (
            <IconStyled style={{ marginLeft: "auto" }} onClick={onLogout}>
              <MdLogout size={"3em"} />
            </IconStyled>
          ) : null}{" "}
        </StyledNav>
      </Container>
    </StyledHeader>
  );
  return header;
};
export default Header;
