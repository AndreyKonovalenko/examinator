import React from "react";
import { Flex } from "../components/styles/Flex.styled";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import AdminRegisterForm from "../components/admin/AdminRegisterFrom";
import AddQuizModal from "../components/admin/AddQuizModal";
import LogsListCardAdmin from "../components/admin/LogsListCardAdmin";
import QuizCardAdmin from "../components/admin/QuizCardAdmin";
import QuizzesListCardAdmin from "../components/admin/QuizzesListCardAdmin";
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
  setUsersTabOff,
  setQuizzesTabOff,
  setLogsTabOn,
  setLogsTabOff,
  setQuestionsTabOff,
  setQuestionsTabOn,
  setAddQuizModalOn,
  setAddQuizModalOff,
} from "../features/ui/uiSlice";

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
  } = useSelector((state) => state.ui);
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

  // local quiz state
  const [isSelectedQuiz, setIsSelectedQuiz] = useState(null);
  const [quizChecked, setQuizChecked] = useState([]);
  const [isEditQuizzesList, setIsEditQuizzesList] = useState(false);

  // local question state
  const [isSelectedQuestion, setIsSelectedQuestion] = useState(null);
  const [questionChecked, setQuestionChecked] = useState([]);
  const [isEditQuestionsList, setIsEditQuestionsList] = useState(false);

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

  const isEditHandlerLogs = () => {
    if (adminState.userLogs.length === 0) {
      toast.error("Nothing to edit");
    }
    if (adminState.userLogs.length > 0) {
      setLogChecked([]);
      setIsEditLogsList(!isEditLogsList);
    }
  };

  const deleteLogsHandler = () => {
    if (logChecked.length > 0) {
      logChecked.forEach((element) => dispatch(deleteLog(element)));
    } else {
      toast.error("You try to delete empty or not selected logs");
    }
  };

  const logCheckedHandler = (id, event) => {
    event.preventDefault();
    setLogChecked([...logChecked, id]);
  };

  const logUnCheckHandler = (id, event) => {
    event.preventDefault();
    setLogChecked(logChecked.filter((element) => element !== id));
  };

  const onCloserLogsTabHandler = () => {
    dispatch(setLogsTabOff());
  };

  const onLogsClickHandler = (id, event) => {
    event.preventDefault();
    dispatch(getLogById(id));
    navigate("/summary");
  };

  // ----------------------------- USER LIST HANDLERS ---------------------------- //
  const onUserClickHandler = (args, event) => {
    event.preventDefault();
    setIsSelectedUser(args[1]);
    dispatch(getUserLogs(args[0]));
    dispatch(setLogsTabOn());
  };

  const isEditHandlerUsers = () => {
    setIsEditUsersList(!isEditUsersList);
  };

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

  const userCheckedHandler = (id, event) => {
    event.preventDefault();
    setUserChecked([...userChecked, id]);
  };

  const userUnCheckHandler = (id, event) => {
    event.preventDefault();
    setUserChecked(userChecked.filter((element) => element !== id));
  };

  const onCloserUsersTabHandler = () => {
    dispatch(setUsersTabOff());
  };

  // ----------------------------- QUIZZES LIST HANDELRS ------------------------- //

  const onQuizClickHundler = (args, event) => {
    event.preventDefault();
    setIsSelectedQuiz(args[1]);
    dispatch(getFullQuiz(args[0]));
    dispatch(setQuestionsTabOn());
  };

  const isEditHandlerQuizzes = () => {
    setIsEditQuizzesList(!isEditQuizzesList);
  };

  const deleteQuizHandler = () => {
    if (quizChecked.length > 0) {
      console.log("Quiz will be deleted");
    } else {
      toast.error("Quiz for deleting is not selected!");
    }
  };
  const onAddNewQuizHandler = () => {
    dispatch(setAddQuizModalOn());
  };

  const onCloseAddQuizModal = () => {
    dispatch(setAddQuizModalOff());
  };

  const quizCheckedHandler = (id, event) => {
    event.preventDefault();
    setQuizChecked([...quizChecked, id]);
  };

  const quizUnCheckHandler = (id, event) => {
    event.preventDefault();
    setQuizChecked(quizChecked.filter((element) => element !== id));
  };

  const onCloseQuizzesTabHandler = () => {
    dispatch(setQuizzesTabOff());
  };

  //-------------------------- QUESTIONS LIST HANDELRS ------------------------- //

  const onQuestionClickHundler = (args, event) => {
    event.preventDefault();
    setIsSelectedQuestion(args[1]);
    //    dispatch(getFullQuiz(args[0]));
  };

  const isEditHandlerQuestions = () => {
    setIsEditQuestionsList(!isEditQuestionsList);
  };

  const deleteQuestionHandler = () => {
    if (questionChecked.length > 0) {
      console.log("Question will be deleted");
    } else {
      toast.error("Question for deleting is not selected!");
    }
  };
  const onAddNewQuestionHandler = () => {
    console.log("new question added");
  };

  const questionCheckedHandler = (id, event) => {
    event.preventDefault();
    setQuestionChecked([...questionChecked, id]);
  };

  const questionUnCheckHandler = (id, event) => {
    event.preventDefault();
    setQuestionChecked(questionChecked.filter((element) => element !== id));
  };

  const onCloseQuestionsTabHandler = () => {
    dispatch(setQuestionsTabOff());
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
      {addQuizModal ? (
        <AddQuizModal onClose={onCloseAddQuizModal} ru={ru} en={en} />
      ) : null}

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
          <LogsListCardAdmin
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
          <QuizzesListCardAdmin
            сheckedHandler={quizCheckedHandler}
            checked={quizChecked}
            deleteHandler={deleteQuizHandler}
            en={en}
            isEdit={isEditQuizzesList}
            item={adminState.quizzes}
            onAddHandler={onAddNewQuizHandler}
            onClickHandler={onQuizClickHundler}
            onCloseHandler={onCloseQuizzesTabHandler}
            onSettingsHandler={isEditHandlerQuizzes}
            ru={ru}
            selected={isSelectedQuiz}
            unCheckHandler={quizUnCheckHandler}
          />
        ) : null}
        {adminState.quiz && questionsTab ? (
          <QuizCardAdmin
            сheckedHandler={questionCheckedHandler}
            checked={questionChecked}
            deleteHandler={deleteQuestionHandler}
            en={en}
            isEdit={isEditQuestionsList}
            item={adminState.quiz}
            onAddHandler={onAddNewQuestionHandler}
            onClickHandler={onQuestionClickHundler}
            onCloseHandler={onCloseQuestionsTabHandler}
            onSettingsHandler={isEditHandlerQuestions}
            ru={ru}
            selected={isSelectedQuestion}
            unCheckHandler={questionUnCheckHandler}
          />
        ) : null}
      </Flex>
    </>
  );
};

export default Admin;
