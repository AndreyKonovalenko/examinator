import { Li, NavButton } from "../styles/Header.styled";

const NavItem = (porps) => {
  const { children, onClickHandler, outside } = porps;
  return (
    <Li>
      <NavButton
        onClick={() => {
          onClickHandler();
        }}
      >
        {children}
      </NavButton>
      {outside}
    </Li>
  );
};

export default NavItem;
