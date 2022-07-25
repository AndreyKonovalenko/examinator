import React from "react";
import { Flex } from "../components/styles/Flex.styled";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import AdminRegisterForm from "../components/admin/AdminRegisterFrom";
import LogListCardAdmin from "../components/admin/LogListCardAdmin";
import QuizCardAdmin from "../components/admin/QuizCardAdmin";
import QuizListCardAdmin from "../components/admin/QuizListCardAdmin";
import Spinner from "../components/Spinner";
import UsersListCard from "../components/admin/UsersListCard";

import {
  deleteLog,
  deleteUser,
  getFullQuiz,
  getQuizzes,
  getUserLogs,
  getUsers,
  resetAdminState,
} from "../features/admin/adminSlice";
import { createNewUser } from "../features/admin/adminSlice";
import { getLogById } from "../features/log/logSlice";
import {
  setRegisterUserTabOn,
  setRegisterUserTabOff,
  setUsersTabOn,
  setUsersTabOff,
  setQuizzesTabOff,
  setLogsTabOn,
  setLogsTabOff,
} from "../features/ui/uiSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { ru, en, registerUserTab, usersTab, quizzesTab, logsTab } =
    useSelector((state) => state.ui);
  const adminState = useSelector((state) => state.admin);

  // local register form state
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    password2: "",
  });
  const { username, name, password, password2 } = formData;

  // local user state
  const [isSelectedUser, setIsSelectedUser] = useState(null);
  const [userChecked, setUserChecked] = useState([]);
  const [isEditUsersList, setIsEditUsersList] = useState(false);

  // local log state
  const [logChecked, setLogChecked] = useState([]);
  const [isEditLogsList, setIsEditLogsList] = useState(false);

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

  // local quizzes state
  const [isSelectedQuiz, setIsSelectedQuiz] = useState(null);

  // ------------------------ REGISTER FORM HADLERS ------------------------------- //
  const onChange = (event) => {
    event.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        username,
        password,
      };
      dispatch(createNewUser(userData));
      dispatch(getUsers());
    }
  };
  const onCloserRegisterTabHandler = () => {
    dispatch(setRegisterUserTabOff());
  };
  // ----------------------------- LOG LIST HANDLERS ------------------------------ //

  // Settings icon handler on Log Card
  const isEditHandlerLogs = () => {
    if (adminState.userLogs.length === 0) {
      toast.error("Nothing to edit");
    }
    if (adminState.userLogs.length > 0) {
      setLogChecked([]);
      setIsEditLogsList(!isEditLogsList);
    }
  };

  // Delete icon handle on Log Card
  const deleteLogsHandler = () => {
    if (logChecked.length > 0) {
      logChecked.forEach((element) => dispatch(deleteLog(element)));
    } else {
      toast.error("You try to delete empty or not selected logs");
    }
  };

  // Log list handlers
  const logCheckedHandler = (logId, event) => {
    event.preventDefault();
    setLogChecked([...logChecked, logId]);
  };
  const logUnCheckHandler = (logId, event) => {
    event.preventDefault();
    setLogChecked(logChecked.filter((element) => element !== logId));
  };

  const onCloserLogsTabHandler = () => {
    dispatch(setLogsTabOff());
  };

  const onLogsClickHandler = (logId, event) => {
    event.preventDefault();
    dispatch(getLogById(logId));
    navigate("/summary");
  };

  // ----------------------------- USER LIST HANDLERS ---------------------------- //
  const onUserClickHandler = (args, event) => {
    event.preventDefault();
    setIsSelectedUser(args[1]);
    dispatch(getUserLogs(args[0]));
    dispatch(setLogsTabOn());
  };

  // Settings icon handler on User list Card
  const isEditHandlerUsers = () => {
    setIsEditUsersList(!isEditUsersList);
  };

  // Delete icon handle on User list Card
  const deleteUserHandler = () => {
    if (userChecked.length > 0) {
      userChecked.forEach((element) => dispatch(deleteUser(element)));
    } else {
      toast.error("User for deleting is not selected!");
    }
  };

  const onAddNewUserHandler = () => {
    dispatch(setRegisterUserTabOn());
  };

  const userCheckedHandler = (userId, event) => {
    event.preventDefault();
    setUserChecked([...userChecked, userId]);
  };
  const userUnCheckHandler = (userId, event) => {
    event.preventDefault();
    setUserChecked(userChecked.filter((element) => element !== userId));
  };

  const onCloserUsersTabHandler = () => {
    dispatch(setUsersTabOff());
  };

  // ----------------------------- QUIZZES LIST HANDELRS ------------------------- //

  const onQuizClickHundler = (args, event) => {
    event.preventDefault();
    setIsSelectedQuiz(args[1]);
    dispatch(getFullQuiz(args[0]));
  };
  const onCloseQuizzesTabHandler = () => {
    dispatch(setQuizzesTabOff());
  };
  // ------------------------------------- || ------------------------------------ //

  if (!adminState.users && adminState.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin | Examinator</title>
      </Helmet>
      {adminState.isLoading ? <Spinner /> : null}

      <Flex>
        {registerUserTab ? (
          <AdminRegisterForm
            en={en}
            name={name}
            onChange={onChange}
            onSubmit={onSubmit}
            password={password}
            password2={password2}
            ru={ru}
            username={username}
            onCloseHandler={onCloserRegisterTabHandler}
          />
        ) : null}
        {adminState.users && usersTab ? (
          <UsersListCard
            сheckedHandler={userCheckedHandler}
            checked={userChecked}
            deleteHandler={deleteUserHandler}
            en={en}
            isEdit={isEditUsersList}
            item={adminState.users}
            onAddHandler={onAddNewUserHandler}
            onClickHandler={onUserClickHandler}
            onCloseHandler={onCloserUsersTabHandler}
            onSettingsHandler={isEditHandlerUsers}
            ru={ru}
            selected={isSelectedUser}
            unCheckHandler={userUnCheckHandler}
          />
        ) : null}
        {adminState.userLogs && logsTab ? (
          <LogListCardAdmin
            сheckedHandler={logCheckedHandler}
            checked={logChecked}
            deleteHandler={deleteLogsHandler}
            en={en}
            isEdit={isEditLogsList}
            item={adminState.userLogs}
            onClickHandler={onLogsClickHandler}
            onCloseHandler={onCloserLogsTabHandler}
            onSettingsHandler={isEditHandlerLogs}
            ru={ru}
            unCheckHandler={logUnCheckHandler}
          />
        ) : null}
        {adminState.quizzes && quizzesTab ? (
          <QuizListCardAdmin
            item={adminState.quizzes}
            onQuizClickHundler={onQuizClickHundler}
            selected={isSelectedQuiz}
            onClose={onCloseQuizzesTabHandler}
            en={en}
            ru={ru}
          />
        ) : null}
        {adminState.quiz ? (
          <QuizCardAdmin item={adminState.quiz} en={en} ru={ru} />
        ) : null}
      </Flex>
    </>
  );
};

export default Admin;
