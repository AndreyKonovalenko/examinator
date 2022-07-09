import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from '../components/styles/Flex.styled';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import UsersListCard from '../components/UsersListCard';
import LogListCard from '../components/LogListCard';
import Spinner from '../components/Spinner';

import { getUsers, getUserLogs } from '../features/admin/adminSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const adminState = useSelector((state) => state.admin);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user) {
      if (!user.admin) {
        toast.error('You do not have administrator access!');
        navigate('/');
      } else {
        dispatch(getUsers());
      }
    }
  }, [user, navigate, dispatch]);

  const onUserClickHundler = (userId, event) => {
    event.preventDefault();
    dispatch(getUserLogs(userId));
  };

  if (adminState.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Admin | Examinator</title>
      </Helmet>
      <Flex>
        {adminState.users ? (
          <UsersListCard item={adminState.users} onClick={onUserClickHundler} />
        ) : null}
        {adminState.userLogs ? (
          <LogListCard item={adminState.userLogs} />
        ) : null}
      </Flex>
    </>
  );
};

export default Admin;
