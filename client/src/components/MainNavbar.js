import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
//import Logo from './Logo';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to='/'>logo</RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
