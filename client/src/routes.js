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
    children: [
      { path: 'quiz', element: <Quiz /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'admin', element: <Admin /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

export default routes;
