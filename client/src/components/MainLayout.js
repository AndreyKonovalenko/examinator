import React from 'react'
import Error from '../components/Error.js'

import { Outlet } from 'react-router-dom'
import { StyledMainLayout } from './styles/MainLayout.styled'

import Header from './Header'
import Footer from './Footer.js'

export default function MainLayout() {
  return (
    <>
      <Header />
      <Error />
      <StyledMainLayout>
        <Outlet />
      </StyledMainLayout>
      <Footer />
    </>
  )
}
