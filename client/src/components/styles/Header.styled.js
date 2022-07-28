import styled from "styled-components";

const nav_size = 60;

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.text.onPrimary};

  }
`;

export const Nav = styled.nav`
  height: ${nav_size}px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UL = styled.ul`
  display: flex;
  height: 100%;
  margin: 0;
  justify-content: flex-end;
  list-style: none;
  max-width: 100%;
  padding: 0;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: row;
  }
`;

export const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavButton = styled.button`
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: ${({ bg }) =>
    bg || (({ theme }) => theme.colors.primary.light)};
  color: ${({ color }) =>
    color || (({ theme }) => theme.colors.text.onPrimary)};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
    color: ${({ hcolor }) => hcolor}
`;
export const Logo = styled.span`
  font-size: 2em;
  font-weight: bold;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;
