import styled from "styled-components";
export const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary.light};
  &:hover {
    opacity: 0.5;
    transform: scale(0.98);
    background-color: ${({ theme }) => theme.colors.primary.main};
`;
