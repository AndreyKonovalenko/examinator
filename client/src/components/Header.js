import { Container } from './styles/Container.styled'
import { StyledHeader, StyledNav } from './styles/Header.styled'
import { Button } from './styles/Button.styled'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useEffect } from 'react'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let location = useLocation()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  useEffect(() => {
    console.log(location)
  }, [location])
  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <h1>Examinator</h1>
          {user ? <Button onClick={onLogout}>Logout</Button> : null}
          {location.pathname === '/summary' ? (
            <Button onClick={() => navigate('/')}>Dashboard</Button>
          ) : null}
        </StyledNav>
      </Container>
    </StyledHeader>
  )
}
export default Header
