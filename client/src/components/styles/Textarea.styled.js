import styled from 'styled-components';

export const Conteiner = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: ${({ theme }) => theme.colors.primary.main};
    margin: 15px 0;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
export const STextarea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.surface};
  border-color: ${({ theme }) => theme.colors.primary.light};
  border-radius: 3px;
  border-style: solid;
  border-width: 2px;
  color: ${({ theme }) => theme.colors.text.onBackground};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  margin: 10px 0;
  max-width: 95%;
  width: 95%;
  resize: none;
  padding: 2px;
  overflow-y: hidden;
  maxlength: 5;
  &:hover {
    opacity: 1;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  &:focus-visible {
    outline: none;
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
