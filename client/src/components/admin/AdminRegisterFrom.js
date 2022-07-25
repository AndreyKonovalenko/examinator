import { Button } from "../styles/Button.styled";
import { Form, Input, Title, Wrapper } from "../styles/Form.Styled";
import { IconStyled } from "../styles/Icon.styled";
import { MdClose } from "react-icons/md";
import { StyledSeparator } from "../styles/Separator.styled";
import theme from "../../theme/index";

const AdminRegisterForm = (props) => {
  const {
    ru,
    en,
    username,
    name,
    password,
    onChange,
    onSubmit,
    password2,
    onCloseHandler,
  } = props;

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: "right" }}>
          <IconStyled
            bg={theme.colors.surface}
            color={theme.colors.primary.light}
            onClick={onCloseHandler}
          >
            <MdClose size={"2em"} />
          </IconStyled>
          <StyledSeparator />
        </div>
        {ru ? <Title>Добваить пользователя</Title> : null}
        {en ? <Title>Add new User</Title> : null}
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
          {ru ? "Добвить" : null}
          {en ? "Submit" : null}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default AdminRegisterForm;
