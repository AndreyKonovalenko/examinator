import {
  StyledDropdownMenu,
  DMButton,
  IconConteiner,
  TextConteiner,
} from "../styles/DropdownMenu.styled";
import {
  MdLogout,
  MdDoneOutline,
  MdOutlineAccountCircle,
  MdOutlineLogin,
} from "react-icons/md";
import theme from "../../theme/index";

const DropdownMenu = (props) => {
  const { ru, en, name, username, stats, onCP, onLogout } = props;
  return (
    <StyledDropdownMenu>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <IconConteiner>
          <MdOutlineLogin size={"1em"} />
        </IconConteiner>
        <TextConteiner>
          {" "}
          <p>{username}</p>
        </TextConteiner>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <IconConteiner>
          <MdOutlineAccountCircle size={"1em"} />
        </IconConteiner>
        <TextConteiner>
          <p> {name}</p>
        </TextConteiner>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <IconConteiner>
          <MdDoneOutline size={"1em"} />
        </IconConteiner>
        <TextConteiner>
          {ru ? <p> попыток: {stats}</p> : null}
          {en ? <p>stats: {stats}</p> : null}
        </TextConteiner>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <>
          {ru ? (
            <DMButton onClick={() => onCP()}>изменить пароль</DMButton>
          ) : null}
          {en ? (
            <DMButton onClick={() => onCP()}>change password</DMButton>
          ) : null}

          <DMButton onClick={() => onLogout()}>
            <MdLogout size={"1.5em"} />
          </DMButton>
        </>
      </div>
    </StyledDropdownMenu>
  );
};

export default DropdownMenu;
