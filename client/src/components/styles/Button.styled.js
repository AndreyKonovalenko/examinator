import styled from "styled-components";

export const Button = styled.button`
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 25px;
  margin: 2% 0%;
  background-color: ${({ bg }) => bg || (({ theme }) => theme.colors.surface)};
  color: ${({ color }) => color || (({ theme }) => theme.colors.primary.light)};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
  &:disabled {
    border-radius: 50px;
    border: none;
    pointer-events: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: auto;
    font-size: 16px;
    font-weight: 700;
    margin: 0%;
    background-color: ${({ bg }) =>
      bg || (({ theme }) => theme.colors.surface)};
    color: ${({ color }) =>
      color || (({ theme }) => theme.colors.primary.light)};
  }
`;
