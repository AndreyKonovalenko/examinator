import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import UsersListCard from "../components/UsersListCard";
import Spinner from "../components/Spinner";

import { getUsers } from "../features/admin/adminSlice";
const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const adminState = useSelector((state) => state.admin);

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
  }, [user, navigate]);

  if (adminState.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin | Examinator</title>
      </Helmet>
      {adminState.users ? <UsersListCard data={adminState.users} /> : null}
    </>
  );
};

export default Admin;
