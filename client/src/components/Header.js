import { Container } from './styles/Container.styled'
import { StyledHeader, StyledNav } from './styles/Header.styled'
import { Button } from './styles/Button.styled'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <h1>Тема: Охрана труда на предприятии</h1>
          {user ? <Button onClick={onLogout}>Logout</Button> : null}
        </StyledNav>
      </Container>
    </StyledHeader>
  )
}
export default Header
