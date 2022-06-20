import React from 'react';
import Error from '../components/Error.js';

import { Outlet } from 'react-router-dom';
import { Container } from './styles/Container.styled';

import Header from './Header';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Error />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
