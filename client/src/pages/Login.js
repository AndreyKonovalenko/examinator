import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '../components/styles/Button.styled';
import { Form, Input, Title, Wrapper } from '../components/styles/Form.Styled';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import theme from '../theme/index';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (event) => {
    event.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const userData = { username, password };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const loginForm = (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Title>Идентификация пользователя</Title>
        <Input
          placeholder='Username'
          type='text'
          name='username'
          value={username}
          onChange={onChange}
        />
        <Input
          placeholder='Password'
          type='password'
          name='password'
          value={password}
          onChange={onChange}
        />
        <Button
          bg={theme.colors.primary.light}
          color={theme.colors.text.onPrimary}>
          Войти
        </Button>
      </Form>
    </Wrapper>
  );

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Login | Examinator</title>
      </Helmet>
      {loginForm}
    </>
  );
};

export default Login;
