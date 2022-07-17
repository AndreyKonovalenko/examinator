import styled from 'styled-components';

export const StyledCockpit = styled.div`
  width: 99%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  margin: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  & > ul {
    padding: 0;
  }
  & > h2 {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;