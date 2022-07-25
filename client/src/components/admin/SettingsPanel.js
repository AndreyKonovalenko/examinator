import { IconStyled } from "../styles/Icon.styled";
import { MdSettings, MdDelete, MdClose, MdAdd } from "react-icons/md";
import theme from "../../theme";

const SettingPanel = (props) => {
  const { onSettings, isEdit, onAdd, onDelete, onClose, hideAdd } = props;
  return (
    <div style={{ textAlign: "right" }}>
      <IconStyled
        bg={theme.colors.surface}
        color={theme.colors.primary.light}
        onClick={onSettings}
      >
        <MdSettings size={"2em"} />
      </IconStyled>

      {isEdit ? (
        <>
          {!hideAdd ? (
            <IconStyled
              bg={theme.colors.surface}
              color={theme.colors.primary.light}
            >
              <MdAdd size={"2em"} onClick={onAdd} />
            </IconStyled>
          ) : null}
          <IconStyled
            bg={theme.colors.surface}
            color={theme.colors.primary.light}
            hcolor={theme.colors.error}
            onClick={onDelete}
          >
            <MdDelete size={"2em"} />
          </IconStyled>
        </>
      ) : null}
      <IconStyled
        bg={theme.colors.surface}
        color={theme.colors.primary.light}
        onClick={onClose}
      >
        <MdClose size={"2em"} />
      </IconStyled>
    </div>
  );
};

export default SettingPanel;
