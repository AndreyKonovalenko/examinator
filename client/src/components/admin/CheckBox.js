import { IconStyled } from "../styles/Icon.styled";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import theme from "../../theme";

const CheckBox = (props) => {
  const { unCheckHandler, onCheckHandler, id, isChecked } = props;
  return (
    <div style={{ margin: "auto", marginRight: "5px" }}>
      <IconStyled bg={theme.colors.surface} color={theme.colors.primary.light}>
        {isChecked ? (
          <MdCheckBox
            size={"2em"}
            onClick={(event) => unCheckHandler(id, event)}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            size={"2em"}
            onClick={(event) => onCheckHandler(id, event)}
          />
        )}
      </IconStyled>
    </div>
  );
};

export default CheckBox;
