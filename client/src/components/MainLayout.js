import React from 'react'

import { Outlet } from 'react-router-dom'
import { Container } from './styles/Container.styled'

import Header from './Header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
