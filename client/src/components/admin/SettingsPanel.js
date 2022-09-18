import { IconStyled } from '../styles/Icon.styled';
import {
  MdSettings,
  MdDelete,
  MdClose,
  MdAdd,
  MdOutlineUnarchive,
} from 'react-icons/md';
import theme from '../../theme';

const SettingPanel = (props) => {
  const {
    hideAdd,
    isEdit,
    onAdd,
    onClose,
    onDelete,
    onSettings,
    onUnArchive,
    hideUnArchive,
  } = props;
  return (
    <div style={{ textAlign: 'right' }}>
      {!hideUnArchive ? (
        <IconStyled
          onClick={onUnArchive}
          bg={theme.colors.surface}
          color={theme.colors.primary.light}>
          <MdOutlineUnarchive size={'2em'} />
        </IconStyled>
      ) : null}
      <IconStyled
        bg={theme.colors.surface}
        color={theme.colors.primary.light}
        onClick={onSettings}>
        <MdSettings size={'2em'} />
      </IconStyled>

      {isEdit ? (
        <>
          {!hideAdd ? (
            <IconStyled
              bg={theme.colors.surface}
              color={theme.colors.primary.light}>
              <MdAdd size={'2em'} onClick={onAdd} />
            </IconStyled>
          ) : null}
          <IconStyled
            bg={theme.colors.surface}
            color={theme.colors.primary.light}
            hcolor={theme.colors.error}
            onClick={onDelete}>
            <MdDelete size={'2em'} />
          </IconStyled>
        </>
      ) : null}
      <IconStyled
        bg={theme.colors.surface}
        color={theme.colors.primary.light}
        onClick={onClose}>
        <MdClose size={'2em'} />
      </IconStyled>
    </div>
  );
};

export default SettingPanel;
