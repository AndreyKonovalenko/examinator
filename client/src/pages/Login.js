import * as React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from '../components/styles/Button.styled'
import { StyledForm } from '../components/styles/Form.Styled'
import { Container } from '../components/styles/Container.styled'
import { Flex } from '../components/styles/Flex.styled'
import { StyledInputContainer } from '../components/styles/InputContainer.Styled'

const Login = () => {
  // const navigate = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     email: 'demo@devias.io',
  //     password: 'Password123',
  //   },
  //   validationSchema: Yup.object().shape({
  //     email: Yup.string()
  //       .email('Must be a valid email')
  //       .max(255)
  //       .required('Email is required'),
  //     password: Yup.string().max(255).required('Password is required'),
  //   }),
  //   onSubmit: () => {
  //     navigate('/app/quiz', { replace: true });
  //   },
  // });

  const loginForm = (
    <StyledForm>
      <StyledInputContainer>
        <label>Username </label>
        <input type="text" name="uname" required />
        {}
      </StyledInputContainer>
      <StyledInputContainer>
        <label>Password </label>
        <input type="password" name="pass" required />
        {}
      </StyledInputContainer>
      <div className="button-container">
        <input type="submit" />
      </div>
    </StyledForm>
  )

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Examinator</title>
      </Helmet>
      <p>Login Page</p>
      <Link to="/app/quiz" style={{ textDecoration: 'none' }}>
        <Button>Начать тест</Button>
      </Link>
      {loginForm}
    </>
  )
}

export default Login
