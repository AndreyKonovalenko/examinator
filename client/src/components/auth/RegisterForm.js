import { Form, Input, Title, Wrapper } from "../styles/Form.Styled";
import { Button } from "../styles/Button.styled";
import theme from "../../theme/index";

const RegisterForm = (props) => {
  const { ru, en, username, name, password, onChange, onSubmit, password2 } =
    props;

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {ru ? <Title>Регистрация</Title> : null}
        {en ? <Title>Register</Title> : null}
        <Input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
        <Input
          placeholder="Enter your full name"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <Input
          placeholder="Confirm password"
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
        />
        <Button
          bg={theme.colors.primary.light}
          color={theme.colors.text.onPrimary}
        >
          {ru ? "Зарегистрироваться" : null}
          {en ? "Submit" : null}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default RegisterForm;
