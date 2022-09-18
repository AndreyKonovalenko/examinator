import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { StyledMainLayout } from "./styles/MainLayout.styled";
import { IconContext } from "react-icons";
import jwt_decode from "jwt-decode";
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
import { resetUiState } from "../features/ui/uiSlice";

import Error from "../components/Error.js";
import Header from "./Header";
import Footer from "./Footer.js";
import ChangePassModal from "./auth/ChangePassModal";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { changePasswordModal } = useSelector((state) => state.ui);

  useEffect(() => {
    if (user) {
      const decoded = jwt_decode(user.token);
      if (decoded.exp * 1000 < Date.now()) {
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
      }
    }
  }, [user, dispatch, navigate]);
  return (
    <IconContext.Provider
      value={{ style: { verticalAlign: "middle", alignSelf: "center" } }}
    >
      <Header />
      <Error />
      {changePasswordModal ? <ChangePassModal /> : null}
      <StyledMainLayout>
        <Outlet />
      </StyledMainLayout>
      <Footer />
    </IconContext.Provider>
  );
};

export default MainLayout;
