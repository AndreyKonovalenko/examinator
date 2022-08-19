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

const ChangePassForm = (props) => {
  const { ru, en, currentPassword, onChange, password, onSubmit, password1 } =
    props;

  const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [password1Shown, setPassword1Shown] = useState(false);

  const toggleCurrentPassword = (event) => {
    event.preventDefault();
    setCurrentPasswordShown(!currentPasswordShown);
  };

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const togglePassword1 = (event) => {
    event.preventDefault();
    setPassword1Shown(!password1Shown);
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit} style={{ boxShadow: 'none' }}>
        {ru ? <Title>Изменение пароля</Title> : null}
        {en ? <Title>Change password</Title> : null}
        <div style={{ width: '100%', position: 'relative' }}>
          <Input
            style={{ width: '100%', paddingRight: '40px' }}
            placeholder='Current password'
            type={currentPasswordShown ? 'text' : 'password'}
            name='currentPassword'
            value={currentPassword}
            onChange={onChange}
          />
          <InsideInputIconWrapper
            onClick={(event) => toggleCurrentPassword(event)}>
            <MdRemoveRedEye size={'1.5rem'} />
          </InsideInputIconWrapper>
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <Input
            style={{ width: '100%', position: 'relative' }}
            placeholder='New password'
            type={passwordShown ? 'text' : 'password'}
            name='password'
            value={password}
            onChange={onChange}
          />
          <InsideInputIconWrapper onClick={(event) => togglePassword(event)}>
            <MdRemoveRedEye size={'1.5rem'} />
          </InsideInputIconWrapper>
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <Input
            style={{ width: '100%', paddingRight: '40px' }}
            placeholder='Confirm new password'
            type={password1Shown ? 'text' : 'password'}
            name='password1'
            value={password1}
            onChange={onChange}
          />
          <InsideInputIconWrapper onClick={(event) => togglePassword1(event)}>
            <MdRemoveRedEye size={'1.5rem'} />
          </InsideInputIconWrapper>
        </div>
        <Button
          bg={theme.colors.primary.light}
          color={theme.colors.text.onPrimary}>
          {ru ? 'Сохрранить' : null}
          {en ? 'Save' : null}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default ChangePassForm;
