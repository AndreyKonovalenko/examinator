import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.text.onPrimary};
  padding: 0px 0;
`;

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: row;
  }
`;
