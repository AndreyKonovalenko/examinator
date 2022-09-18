import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { login, reset } from '../features/auth/authSlice';
import LoginForm from '../components/auth/LoginFrom';
import Spinner from '../components/Spinner';

const Login = () => {
  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const { ru, en } = useSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch]);

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

  const form = (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Login | Examinator</title>
      </Helmet>
      <LoginForm
        ru={ru}
        en={en}
        onSubmit={onSubmit}
        onChange={onChange}
        username={username}
        password={password}
      />
    </>
  );

  return isLoading || isSuccess ? <Spinner /> : form;
};

export default Login;
