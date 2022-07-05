import { Container } from "./styles/Container.styled";
import { StyledHeader, StyledNav } from "./styles/Header.styled";
import { IconStyled } from "./styles/Icon.styled";
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
          <h1>
            Examinator
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
};
export default Header;
