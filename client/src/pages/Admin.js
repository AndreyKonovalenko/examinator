import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex } from "../components/styles/Flex.styled";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Cockpit from "../components/admin/Cockpit";
import UsersListCard from "../components/admin/UsersListCard";
import LogListCard from "../components/dashboard/LogListCard";
import Spinner from "../components/Spinner";
import RegisterForm from "../components/login/RegisterForm";

import { getUsers, getUserLogs } from "../features/admin/adminSlice";
import { register } from "../features/auth/authSlice";
import { setAddNewUserOn } from "../features/ui/uiSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { ru, en, addNewUserOn } = useSelector((state) => state.ui);

  const adminState = useSelector((state) => state.admin);

  // local ui state
  const [isSelected, setIsSelected] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    password2: "",
  });

  const { username, name, password, password2 } = formData;

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

  // Cockpit handlers
  const addNewUserSwitch = () => {
    dispatch(setAddNewUserOn());
  };

  // Register form handlers

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
      dispatch(register(userData));
    }
  };

  // User list handlers

  const onUserClickHundler = (args, event) => {
    event.preventDefault();
    setIsSelected(args[1]);
    dispatch(getUserLogs(args[0]));
  };

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
      <Cockpit addNewUserSwitch={addNewUserSwitch} />
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
            en={en}
            ru={ru}
            selected={isSelected}
            item={adminState.users}
            onClick={onUserClickHundler}
          />
        ) : null}
        {adminState.userLogs ? (
          <LogListCard en={en} ru={ru} item={adminState.userLogs} />
        ) : null}
      </Flex>
    </>
  );
};

export default Admin;
