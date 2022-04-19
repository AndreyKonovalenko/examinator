import {Container} from './styles/Container.styled';
import { Button } from "./styles/Button.styled";
import { StyledHeader, Nav } from "./styles/Header.styled";


const Header = () => (
  <StyledHeader>
  <Container>
    <Nav>
      <h1>Тема: Охрана труда на предприятии </h1>
      <Button>Admin</Button> 
    </Nav>
    </Container>
  </StyledHeader>
);

export default Header;
