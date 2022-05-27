import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: normal;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`

export const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px;
  padding: 40px;
  }
`

export const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 16px;
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
`
