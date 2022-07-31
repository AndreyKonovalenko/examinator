import { Form, Input, Title, Wrapper } from '../styles/Form.Styled';
import { Button } from '../styles/Button.styled';
import { MdPassword } from 'react-icons/md';

import theme from '../../theme/index';

const ChangePassForm = (props) => {
  const { ru, en, currentPassword, onChange, password, onSubmit, password2 } =
    props;

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {ru ? <Title>Изменение пороля</Title> : null}
        {en ? <Title>Change password</Title> : null}
        <Input
          placeholder='Current password'
          type='password'
          name='currentPassword'
          value={currentPassword}
          onChange={onChange}
        />

        <Input
          placeholder='New password'
          type='password'
          name='password'
          value={password}
          onChange={onChange}
        />
        <div style={{ width: '80%', position: 'relative' }}>
          <Input
            style={{ width: '100%' }}
            placeholder='Confirm new password'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
          <MdPassword style={{ position: 'absolute' }} />
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
