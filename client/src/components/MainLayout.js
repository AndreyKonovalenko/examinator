import React from 'react';
import { Outlet } from 'react-router-dom';
import {Container} from './styles/Container.styled'
import Header from './Header';


const MainLayout = () => (
      <>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </>
       
);

export default MainLayout;
