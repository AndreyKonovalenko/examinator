import styled from 'styled-components';

export const StyledDropdownMenu = styled.div`
  background-color: ${({ bg }) => bg || (({ theme }) => theme.colors.surface)};
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.colors.text.onSurface};
  overflow: hidden;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 58px;
  width: 250px;
  z-index: 1;
`;

export const DMButton = styled.button`

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
    opacity: 0.9;
    transform: scale(0.98);
    color: ${({ hcolor }) => hcolor}
`;

export const Menu = styled.menu`
  width: 100%;
`;
