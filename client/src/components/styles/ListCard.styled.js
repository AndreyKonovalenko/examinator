import styled from 'styled-components';

export const StyledListCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 5px;
  padding: 25px;
  h3,
  h2 {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
  li > h2 {
    color: ${({ theme }) => theme.colors.text.onSurface};
  }

  span {
    font-size: 16 px;
    font-weight: 700;
  }
`;
