import styled from 'styled-components';

export const Conteiner = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  margin: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: ${({ theme }) => theme.colors.primary.main};
    margin: 15px 0 0 0;
  }
`;
export const STextarea = styled.textarea`
  width: 95%;
  max-width: 95%;
  margin: 10px 0;
  height: 5em;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.primary.light};
  &:hover {
    opacity: 1;
  }
  &:active {
    border-color: red;
  }
`;
export const Flex = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary.light};
  &:hover {
    opacity: 0.5;
    transform: scale(0.98);
  }
`;
