import styled from "styled-components";

export const IconStyled = styled.button`
  vertical-align: middle;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-family: "Podkova", serif;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${({ bg }) =>
    bg || (({ theme }) => theme.colors.primary.light)};
  color: ${({ color }) =>
    color || (({ theme }) => theme.colors.text.onPrimary)};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
    color: ${({ hcolor }) => hcolor}
`;
