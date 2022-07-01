import styled from "styled-components";

export const StatusBage = styled.button`
  border-radius: 50px;
  border: none;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 5px 20px;
  cursor: auto;
  font-size: 16px;
  font-weight: 700;
  background-color: ${({ bg }) => bg || (({ theme }) => theme.colors.surface)};
  color: ${({ color }) => color || (({ theme }) => theme.colors.primary.light)};
`;
