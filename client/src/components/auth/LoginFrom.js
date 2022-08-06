import { useState } from 'react';
import {
  Form,
  Input,
  Title,
  Wrapper,
  InsideInputIconWrapper,
} from '../styles/Form.Styled';
import { Button } from '../styles/Button.styled';
import { MdRemoveRedEye } from 'react-icons/md';
import theme from '../../theme/index';

const LoginForm = (props) => {
  const { ru, en, username, password, onChange, onSubmit } = props;
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {ru ? <Title>Вход</Title> : null}
        {en ? <Title>Login</Title> : null}
        <Input
          placeholder='Username'
          type='text'
          name='username'
          value={username}
          onChange={onChange}
        />
        <div style={{ width: '100%', position: 'relative' }}>
          <Input
            style={{ width: '100%', position: 'relative' }}
            placeholder='password'
            type={passwordShown ? 'text' : 'password'}
            name='password'
            value={password}
            onChange={onChange}
          />
          <InsideInputIconWrapper onClick={(event) => togglePassword(event)}>
            <MdRemoveRedEye size={'1.5rem'} />
          </InsideInputIconWrapper>
        </div>
        <Button
          bg={theme.colors.primary.light}
          color={theme.colors.text.onPrimary}>
          {ru ? 'Войти' : null}
          {en ? 'Login' : null}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
