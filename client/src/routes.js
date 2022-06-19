import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Admin from './pages/Admin';
import Quiz from './pages/Quiz';
import Login from './pages/Login';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'login', element: <Login /> },
      { path: 'admin', element: <Admin /> },
    ],
  },
];

export default routes;
