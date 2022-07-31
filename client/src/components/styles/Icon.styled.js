import styled from 'styled-components';

export const IconStyled = styled.button`
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-family: 'Podkova', serif;
  background-color: ${({ bg }) =>
    bg || (({ theme }) => theme.colors.primary.light)};
  color: ${({ color }) =>
    color || (({ theme }) => theme.colors.text.onPrimary)};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
