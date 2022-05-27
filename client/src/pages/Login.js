import * as React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from '../components/styles/Button.styled'
import { Form, Input, Title, Wrapper } from '../components/styles/Form.Styled'

import theme from '../theme/index'

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
    <Wrapper>
      <Form onSubmit={() => {}}>
        <Title>Идентификация пользователя</Title>
        <Input
          placeholder="Username"
          type="text"
          name="username"
          value=""
          onChange={() => {}}
        />
        <Input
          placeholder="Password"
          type="text"
          name="password"
          value=""
          onChange={() => {}}
        />
        <Button
          bg={theme.colors.primary.light}
          color={theme.colors.text.onPrimary}
        >
          Войти
        </Button>
      </Form>
    </Wrapper>
  )

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Examinator</title>
      </Helmet>
      {loginForm}
      <Link to="/app/quiz" style={{ textDecoration: 'none' }}>
        <Button>Начать тест</Button>
      </Link>
    </>
  )
}

export default Login
