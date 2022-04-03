import React from 'react';
import { Navigate } from 'react-router-dom';
//import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Admin from './pages/Admin';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const routes = [
  {
    path: 'app',
    element: <MainLayout />,
    children: [{ path: 'quiz', element: <Quiz /> }],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'admin', element: <Admin /> },
    ],
  },
];

export default routes;
