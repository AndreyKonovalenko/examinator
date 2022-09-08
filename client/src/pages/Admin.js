import React from "react";
import { Flex } from "../components/styles/Flex.styled";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import AdminRegisterForm from "../components/admin/AdminRegisterFrom";
import AddQuizModal from "../components/admin/AddQuizModal";
import AddQuestionModal from "../components/admin/AddQuestionModal";
import LogsListCardAdmin from "../components/admin/LogsListCardAdmin";
import QuizCardAdmin from "../components/admin/QuizCardAdmin";
import QuizzesListCardAdmin from "../components/admin/QuizzesListCardAdmin";
import Spinner from "../components/Spinner";
import UsersListCard from "../components/admin/UsersListCard";
import EditQuestionModal from "../components/admin/EditQuestionModal";

import { getQuizzes } from "../features/admin/adminSlice";
import { getUsers } from "../features/adminUsers/adminUsersSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    ru,
    en,
    registerUserTab,
    usersTab,
    quizzesTab,
    logsTab,
    questionsTab,
    addQuizModal,
    addQuestionModal,
    editQuestionModal,
  } = useSelector((state) => state.ui);
  const { users } = useSelector((state) => state.adminUsers);
  const { userLogs, quizzes, quiz, isLoading } = useSelector(
    (state) => state.admin
  );
  const { questionData } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user) {
      if (!user.admin) {
        toast.error("You do not have administrator access!");
        navigate("/");
      } else {
        dispatch(getUsers());
        dispatch(getQuizzes());
      }
    }
  }, [user, navigate, dispatch]);

  if (!users && isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin | Examinator</title>
      </Helmet>
      {isLoading ? <Spinner /> : null}
      {addQuizModal ? <AddQuizModal ru={ru} en={en} /> : null}
      {addQuestionModal ? <AddQuestionModal ru={ru} en={en} /> : null}
      {editQuestionModal && questionData ? (
        <EditQuestionModal ru={ru} en={en} />
      ) : null}

      <Flex>
        {registerUserTab ? <AdminRegisterForm en={en} ru={ru} /> : null}
        {users && usersTab ? (
          <UsersListCard en={en} item={users} ru={ru} />
        ) : null}
        {userLogs && logsTab ? (
          <LogsListCardAdmin en={en} item={userLogs} ru={ru} />
        ) : null}
        {quizzes && quizzesTab ? (
          <QuizzesListCardAdmin en={en} item={quizzes} ru={ru} />
        ) : null}
        {quiz && questionsTab ? (
          <QuizCardAdmin en={en} item={quiz} ru={ru} />
        ) : null}
      </Flex>
    </>
  );
};

export default Admin;
