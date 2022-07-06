import { Container } from "./styles/Container.styled";
import { StyledHeader, StyledNav } from "./styles/Header.styled";
import { IconStyled } from "./styles/Icon.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { resetLogState } from "../features/log/logSlice";
import { resetQuizState } from "../features/quiz/quizSlice";
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
    dispatch(reset());
    navigate("/login");
  };

  const onDashboard = () => {
    dispatch(resetLogState());
    dispatch(resetQuizState());
    navigate("/");
  };

  let adimnIcon = null;
  if (user) {
    if (user.admin) {
      adimnIcon = (
        <>
          <IconStyled>
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
          <h1>
            Examinator
            {adimnIcon}
            {location.pathname === "/summary" ? (
              <>
                <span> |</span>
                <IconStyled onClick={onDashboard}>
                  <MdMenu size={"3em"} />
                </IconStyled>
              </>
            ) : null}
          </h1>
          {user ? (
            <IconStyled onClick={onLogout}>
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
