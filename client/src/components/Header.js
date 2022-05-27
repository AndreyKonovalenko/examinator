import { Container } from './styles/Container.styled'
import { StyledHeader, StyledNav } from './styles/Header.styled'
import { Button } from './styles/Button.styled'

const Header = () => (
  <StyledHeader>
    <Container>
      <StyledNav>
        <h1>Тема: Охрана труда на предприятии </h1>
        <Button>Exit</Button>
      </StyledNav>
    </Container>
  </StyledHeader>
)

export default Header
