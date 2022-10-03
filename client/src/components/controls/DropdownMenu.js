import {
  StyledDropdownMenu,
  DMButton,
  IconConteiner,
  TextConteiner,
  LiElem,
} from '../styles/DropdownMenu.styled';
import {
  MdLogout,
  MdDoneOutline,
  MdOutlineAccountCircle,
  MdOutlineLogin,
} from 'react-icons/md';
import { TbDatabase, TbBrandGithub } from 'react-icons/tb';

const DropdownMenu = (props) => {
  const { ru, en, user, stats, onCP, onLogout } = props;
  const { username, name, admin } = user;
  return (
    <StyledDropdownMenu>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <LiElem>
          <IconConteiner>
            <MdOutlineLogin size={'1em'} />
          </IconConteiner>
          <TextConteiner>
            <span>{username}</span>
          </TextConteiner>
        </LiElem>
        <LiElem>
          <IconConteiner>
            <MdOutlineAccountCircle size={'1em'} />
          </IconConteiner>
          <TextConteiner>
            <span> {name}</span>
          </TextConteiner>
        </LiElem>
        <LiElem>
          <IconConteiner>
            <MdDoneOutline size={'1em'} />
          </IconConteiner>
          <TextConteiner>
            {ru ? <span> попыток: {stats}</span> : null}
            {en ? <span>stats: {stats}</span> : null}
          </TextConteiner>
        </LiElem>
        {admin ? (
          <>
            <LiElem>
              <IconConteiner>
                <TbDatabase size={'1em'} />
              </IconConteiner>
              <TextConteiner>
                {ru ? (
                  <span>база данных: {process.env.REACT_APP_DB}</span>
                ) : null}
                {en ? <span>data base: {process.env.REACT_APP_DB}</span> : null}
              </TextConteiner>
            </LiElem>
            <LiElem>
              <IconConteiner>
                <TbBrandGithub size={'1em'} />
              </IconConteiner>
              <TextConteiner>
                <a href='https://github.com/AndreyKonovalenko/examinator.git'>
                  GitHub: v{process.env.REACT_APP_VERSION}
                </a>
              </TextConteiner>
            </LiElem>
          </>
        ) : null}
        <LiElem>
          <TextConteiner></TextConteiner>
        </LiElem>
        <LiElem style={{ justifyContent: 'space-between', padding: 0 }}>
          {ru ? (
            <DMButton onClick={() => onCP()}>изменить пароль</DMButton>
          ) : null}
          {en ? (
            <DMButton onClick={() => onCP()}>change password</DMButton>
          ) : null}

          <DMButton onClick={() => onLogout()}>
            <MdLogout size={'1.5em'} />
          </DMButton>
        </LiElem>
      </ul>
    </StyledDropdownMenu>
  );
};

export default DropdownMenu;
