import styled from "styled-components";

export const ListElem = styled.li`
  width: 100%;
  border-radius: 15px;
  border: none;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  list-style-type: none;
  padding: 5px 20px;
  margin: 10px 0;
  background-color: ${({ theme }) => theme.colors.surface};
  color:  ${({ theme }) => theme.colors.text.onSurface};
 
  & > p {
    margin: 5px;
  }
  &:hover {
    opacity: 0.95;
    transform: scale(0.98);
    background-color: ${({ theme }) => theme.colors.primary.main};
    color:  ${({ theme }) => theme.colors.text.onPrimary};
  },
  
`;
