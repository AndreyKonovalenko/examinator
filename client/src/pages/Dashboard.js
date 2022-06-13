import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dashboard = (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Dashboard | Examinator</title>
      </Helmet>
      <p>Admin Page</p>
    </>
  );
  return dashboard;
};

export default Dashboard;
