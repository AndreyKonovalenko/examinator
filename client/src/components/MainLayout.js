import React from 'react';
import { Outlet } from 'react-router-dom';
import {Container} from './styles/Container.styled'
import MainNavbar from './MainNavbar';


const MainLayout = () => (
      <>
        <MainNavbar />
        <Container>
          <Outlet />
        </Container>
      </>
       
);

export default MainLayout;
