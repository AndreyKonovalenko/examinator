import { IconStyled } from '../styles/Icon.styled';
import {
  MdSettings,
  MdDelete,
  MdClose,
  MdAdd,
  MdOutlineToggleOff,
  MdOutlineToggleOn,
} from 'react-icons/md';
import theme from '../../theme';

const SettingPanel = (props) => {
  const {
    onSettings,
    isEdit,
    onAdd,
    onDelete,
    onClose,
    hideAdd,
    showArchived,
    onToggle,
    hideToggle,
  } = props;
  return (
    <div style={{ textAlign: 'right' }}>
      <IconStyled
        bg={theme.colors.surface}
        color={theme.colors.primary.light}
        onClick={onSettings}>
        <MdSettings size={'2em'} />
      </IconStyled>

      {isEdit ? (
        <>
          {!hideToggle ? (
            <IconStyled
              onClick={onToggle}
              bg={theme.colors.surface}
              color={theme.colors.primary.light}>
              {showArchived ? (
                <MdOutlineToggleOn size={'2em'} />
              ) : (
                <MdOutlineToggleOff size={'2em'} />
              )}
            </IconStyled>
          ) : null}
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
