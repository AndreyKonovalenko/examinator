import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Container } from './styles/Container.styled'
import { StyledModalContainer } from './styles/Modal.styled'
import Header from './Header'

export default function MainLayout() {
  const { modal } = useSelector((state) => state.ui)

  const layout = (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
  return modal ? <StyledModalContainer>{layout}</StyledModalContainer> : layout
}
