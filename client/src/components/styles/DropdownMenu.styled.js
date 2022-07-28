import styled from "styled-components";

export const StyledDropdownMenu = styled.div`
  position: absolute;
  top: 58px;
  width: 300px;
  height: 100px;
  right: 0;
  background-color: ${({ bg }) => bg || (({ theme }) => theme.colors.surface)};
  border: 1px solid black;
  border-radius: 50px;
  padding: 1rem;
  overflow: hidden;
`;
