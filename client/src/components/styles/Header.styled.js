import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.text.onPrimary};
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: space-between;
  padding: 0 1rem;
  & > nav {
    display: flex;
    justify-content: space-between;
    & > ul {
      display: flex;
      height: 100%;
      margin: 0;
      justify-content: flex-end;
      align-items: center;
      list-style: none;
      max-width: 100%;
      padding: 0;
      @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: row;
      }
      & > li {
      }
    }
  }
`;

// export const StyledNav = styled.nav`
//   height: 60px;
//   align-items: center;
//   justify-content: flex-start;
//   margin-bottom: 40px;
// `;

// export const StyledNavUl = styled.ul`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   margin-bottom: 40px;
//   @media (max-width: ${({ theme }) => theme.mobile}) {
//     flex-direction: row;
//   }
