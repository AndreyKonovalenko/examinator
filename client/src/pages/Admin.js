import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from '../components/styles/Flex.styled';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import UsersListCard from '../components/admin/UsersListCard';
import LogListCard from '../components/dashboard/LogListCard';
import Spinner from '../components/Spinner';

import { getUsers, getUserLogs } from '../features/admin/adminSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const adminState = useSelector((state) => state.admin);

  const [isSelected, setIsSelected] = useState(null);

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

  const onUserClickHundler = (args, event) => {
    event.preventDefault();
    setIsSelected(args[1]);
    console.log(args);
    dispatch(getUserLogs(args[0]));
  };

  if (!adminState.users && adminState.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Admin | Examinator</title>
      </Helmet>
      {adminState.isLoading ? <Spinner /> : null}
      <Flex>
        {adminState.users ? (
          <UsersListCard
            selected={isSelected}
            item={adminState.users}
            onClick={onUserClickHundler}
          />
        ) : null}
        {adminState.userLogs ? (
          <LogListCard item={adminState.userLogs} />
        ) : null}
      </Flex>
    </>
  );
};

export default Admin;
