import { Container } from "./styles/Container.styled";
import { StyledHeader, StyledNav } from "./styles/Header.styled";
import { Button } from "./styles/Button.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { resetLogState } from "../features/log/logSlice";
import { resetQuizState } from "../features/quiz/quizSlice";
import { MdLogout, MdMenu } from "react-icons/md";

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
  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <h1>Examinator</h1>
          {location.pathname === "/summary" ? (
            <MdMenu onClick={onDashboard} size={"2em"} />
          ) : null}
          {user ? (
            <Button onClick={onLogout}>
              <MdLogout />
            </Button>
          ) : null}
        </StyledNav>
      </Container>
    </StyledHeader>
  );
};
export default Header;
