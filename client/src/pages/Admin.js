import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex } from "../components/styles/Flex.styled";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Cockpit from "../components/admin/Cockpit";
import UsersListCard from "../components/admin/UsersListCard";
import LogListCardAdmin from "../components/admin/LogListCardAdmin";
import Spinner from "../components/Spinner";
import RegisterForm from "../components/login/RegisterForm";
import {
  getUsers,
  getUserLogs,
  deleteLog,
  resetAdminState,
} from "../features/admin/adminSlice";
import { createNewUser } from "../features/admin/adminSlice";
import { setAddNewUserOn } from "../features/ui/uiSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { ru, en, addNewUserOn } = useSelector((state) => state.ui);
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
  const [isSelected, setIsSelected] = useState(null);
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
      }
    }
  }, [user, navigate, dispatch]);

  // ------------------------ REGISTER FORM HADLERS ------------------------------- //
  const addNewUserSwitch = () => {
    dispatch(setAddNewUserOn());
  };

  const usersSwitch = () => {
    setIsSelected(null);
    dispatch(resetAdminState());
    dispatch(getUsers());
  };

  // ------------------------------------- || ------------------------------------- //

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
  // ------------------------------------- || ------------------------------------- //

  // ----------------------------- LOG LIST HANDLERS -------------------------------- //

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

  // ------------------------------------- || ------------------------------------- //

  // ----------------------------- USER LIST HANDLERS ---------------------------- //
  const onUserClickHundler = (args, event) => {
    event.preventDefault();
    setIsSelected(args[1]);
    dispatch(getUserLogs(args[0]));
  };

  // Settings icon handler on Log Card
  const isEditHandlerUsers = () => {
    setIsEditUsersList(!isEditUsersList);
  };

  const userCheckedHandler = (userId, event) => {
    event.preventDefault();
    setUserChecked([...userChecked, userId]);
  };
  const userUnCheckHandler = (userId, event) => {
    event.preventDefault();
    setUserChecked(userChecked.filter((element) => element !== userId));
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
      <Cockpit addNewUserSwitch={addNewUserSwitch} usersSwitch={usersSwitch} />
      <Flex>
        {addNewUserOn ? (
          <RegisterForm
            ru={ru}
            en={en}
            username={username}
            name={name}
            password={password}
            password2={password2}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        ) : null}
        {adminState.users ? (
          <UsersListCard
            userChecked={userChecked}
            userCheckedHandler={userCheckedHandler}
            userUnCheckHandler={userUnCheckHandler}
            isEditUsersList={isEditUsersList}
            isEditHandlerUsers={isEditHandlerUsers}
            en={en}
            ru={ru}
            selected={isSelected}
            item={adminState.users}
            onClick={onUserClickHundler}
          />
        ) : null}
        {adminState.userLogs ? (
          <LogListCardAdmin
            logChecked={logChecked}
            logCheckedHandler={logCheckedHandler}
            logUnCheckHandler={logUnCheckHandler}
            isEditHandlerLogs={isEditHandlerLogs}
            deleteLogsHandler={deleteLogsHandler}
            isEditLogsList={isEditLogsList}
            en={en}
            ru={ru}
            item={adminState.userLogs}
          />
        ) : null}
      </Flex>
    </>
  );
};

export default Admin;
