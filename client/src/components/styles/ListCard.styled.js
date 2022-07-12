import styled from "styled-components";

export const StyledListCard = styled.div`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 5px;
  padding: 25px;
  & > ul {
    padding: 0;
  }
  & > h2 {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
