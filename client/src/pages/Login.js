import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from '../components/styles/Button.styled'
import { Form, Input, Title, Wrapper } from '../components/styles/Form.Styled'
import { useSelector } from 'react-redux'

import theme from '../theme/index'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const { user } = useSelector((state) => state.auth)

  const { username, password } = formData
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

  const onChange = (event) => {
    event.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const userData = { username, password }
    console.log(userData)

    // dispatch(login(userData))
  }

  const loginForm = (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Title>Идентификация пользователя</Title>
        <Input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
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
