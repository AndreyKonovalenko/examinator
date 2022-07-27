import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.text.onPrimary};
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 1rem;
`;

export const StyledNav = styled.nav`
  height: 60px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: row;
  }
`;

// export const StyledNavUl = styled.ul`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   margin-bottom: 40px;
//   @media (max-width: ${({ theme }) => theme.mobile}) {
//     flex-direction: row;
//   }
