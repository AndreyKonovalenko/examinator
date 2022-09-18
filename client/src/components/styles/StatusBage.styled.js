import styled from "styled-components";

export const StatusBage = styled.span`
  border-radius: 50px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 5px 15px;
  background-color: ${({ bg }) => bg || (({ theme }) => theme.colors.surface)};
  color: ${({ color }) => color || (({ theme }) => theme.colors.primary.light)};
`;

export const Container = styled.div`
  padding-top: 10px;
  width: 100%;
  text-align: right;
`;
