import styled from 'styled-components';

export const Overlay = styled.div`
  background-color: ${({ theme }) => theme.colors.modal};
  display: flex;
  height: 100%;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 1em;
  }
`;

export const MContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 15px;
  overflow: hidden;
  margin: auto;
  width: 768px;
  position: relative;
`;

export const MIcon = styled.button`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  margin: 4px;
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
`;
