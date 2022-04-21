import styled from 'styled-components'

export const StyledCard = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  color:  ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px;
  padding: 40px;
  & > ul {
    padding: 0;
  }
  & > h2 {
    color: ${({ theme }) => theme.colors.primary.dark};
}
`