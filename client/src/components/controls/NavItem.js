import { Li, NavButton } from '../styles/Header.styled';

const NavItem = (porps) => {
  const { children, onClickHandler, outside } = porps;

  const pure = (
    <Li>
      <NavButton
        onClick={() => {
          onClickHandler();
        }}>
        {children}
      </NavButton>
    </Li>
  );

  const loaded = (
    <Li>
      <div style={{ position: 'relative' }}>
        <NavButton
          onClick={() => {
            onClickHandler();
          }}>
          {children}
        </NavButton>
        {outside}
      </div>
    </Li>
  );

  return outside ? loaded : pure;
};

export default NavItem;
