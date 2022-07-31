import { Form, Input, Title, Wrapper } from '../styles/Form.Styled';
import { Button } from '../styles/Button.styled';
import theme from '../../theme/index';

const LoginForm = (props) => {
  const { ru, en, username, password, onChange, onSubmit } = props;

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {ru ? <Title>Идентификация пользователя</Title> : null}
        {en ? <Title>Login</Title> : null}
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
          {ru ? 'Войти' : null}
          {en ? 'Login' : null}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
