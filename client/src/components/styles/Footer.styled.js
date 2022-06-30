import styled from 'styled-components'

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.footer};
  text-align: center;
  padding: 0px 0;
  & > h6 {
    opacity: 0.2;
  }
`
