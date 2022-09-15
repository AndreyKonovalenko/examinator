import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { StyledSeparator } from "../styles/Separator.styled";
import { Form, Input, Title, Wrapper } from "../styles/Form.Styled";
import { IconStyled } from "../styles/Icon.styled";
import { Button } from "../styles/Button.styled";
import {
  createNewUser,
  getUsers,
} from "../../features/adminUsers/adminUsersSlice";
import { setRegisterUserTabOff } from "../../features/ui/uiSlice";

import theme from "../../theme/index";

const AdminRegisterForm = (props) => {
  const dispatch = useDispatch();
  const { ru, en } = props;

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    password2: "",
  });
  const { username, name, password, password2 } = formData;

  const onChange = (event) => {
    event.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        username,
        password,
      };
      dispatch(createNewUser(userData));
      dispatch(getUsers());
    }
  };

  const onClose = () => {
    dispatch(setRegisterUserTabOff());
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: "right" }}>
          <IconStyled
            bg={theme.colors.surface}
            color={theme.colors.primary.light}
            onClick={onClose}
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
