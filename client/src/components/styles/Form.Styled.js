import styled from 'styled-components'

export const StyledForm = styled.form`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px;
  padding: 40px;

  & > h2 {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
  & > input[type='text'],
  input[type='password'] {
    height: 25px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  input[type='submit'] {
    margin-top: 10px;
    cursor: pointer;
    font-size: 15px;
    background: #01d28e;
    border: 1px solid #01d28e;
    color: #fff;
    padding: 10px 20px;
  }

  input[type='submit']:hover {
    background: #6cf0c2;
  }
`
