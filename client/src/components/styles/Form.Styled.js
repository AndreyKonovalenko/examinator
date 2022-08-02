import styled from "styled-components";

const inputFontSize = 16;

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: normal;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Form = styled.form`
  margin: 0 auto;
  max-width: 414px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 5px;
  padding: 25px;
`;

export const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background-color: ${({ theme }) => theme.colors.surface};
  color:  ${({ theme }) => theme.colors.text.onSurface};
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: ${inputFontSize + "px"};
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  ::placeholder { { /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-family: 'Podkova', serif;
    color: ${({ theme }) => theme.colors.text.onSurface};
    opacity: 0.4
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    font-family: 'Podkova', serif;
    color: ${({ theme }) => theme.colors.text.onSurface};
    opacity: 0.4
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    font-family: 'Podkova', serif;
    color: ${({ theme }) => theme.colors.text.onSurface};
    opacity: 0.4
  }
`;

// wrapper height cal = input font size +2 + input padding * 2  + input border * 2

export const InsideInputIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 2px;
  padding: 0 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: ${inputFontSize + 2 + 11 * 2 + 2 + "px"};
  color: ${({ theme }) => theme.colors.primary.light};
  background-color: ${({ theme }) => theme.colors.background};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
