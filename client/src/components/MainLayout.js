import React from "react";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { StyledMainLayout } from "./styles/MainLayout.styled";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { resetLogState } from "../features/log/logSlice";
import { resetLogsState } from "../features/logs/logsSlice";
import { resetQuizState } from "../features/quiz/quizSlice";
import { resetQuizzesState } from "../features/quizzes/quizzesSlice";
import { resetUiState } from "../features/ui/uiSlice";
import { IconContext } from "react-icons";

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
      console.log(user);
      const decoded = jwt_decode(user.token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(logout());
        dispatch(reset());
        dispatch(resetLogState());
        dispatch(resetLogsState());
        dispatch(resetQuizState());
        dispatch(resetQuizzesState());
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
