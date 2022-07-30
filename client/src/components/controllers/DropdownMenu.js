import { StyledDropdownMenu, DMButton } from '../styles/DropdownMenu.styled';
import {
  MdLogout,
  MdDoneOutline,
  MdOutlineAccountCircle,
} from 'react-icons/md';

const DropdownMenu = (props) => {
  const { ru, en, name, username, stats, onCP, onLogout } = props;
  return (
    <StyledDropdownMenu>
      <p>
        <MdOutlineAccountCircle /> {username}
      </p>
      <p> {name}</p>
      {ru ? (
        <p>
          {' '}
          <MdDoneOutline />
          попыток: {stats}
        </p>
      ) : null}
      {en ? (
        <p>
          {' '}
          <MdDoneOutline />
          stats: {stats}
        </p>
      ) : null}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <>
          {ru ? (
            <DMButton onClick={() => onCP()}>изменить пароль</DMButton>
          ) : null}
          {en ? (
            <DMButton onClick={() => onCP()}>change password</DMButton>
          ) : null}

          <DMButton onClick={() => onLogout()}>
            <MdLogout size={'1.5em'} />
          </DMButton>
        </>
      </div>
    </StyledDropdownMenu>
  );
};

export default DropdownMenu;
