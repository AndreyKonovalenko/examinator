import styled from "styled-components";

export const StyledSeparator = styled.hr`
  border-radius: 15px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text.onSurface};
  opacity: 0.1;
`;
