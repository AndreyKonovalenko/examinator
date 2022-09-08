import { ListElem } from "../styles/ListElem.styled";
import { StyledListCard } from "../styles/ListCard.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../../features/adminUsers/adminUsersSlice";
import { getUserLogs } from "../../features/adminLogs/adminLogsSlice";
import {
  setLogsTabOn,
  setRegisterUserTabOn,
  setUsersTabOff,
} from "../../features/ui/uiSlice";

import uniqid from "uniqid";
import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme/index.js";

const UsersListCard = (props) => {
  const dispatch = useDispatch();
  const { en, item, ru } = props;

  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // List Hadlers

  const onClickHandler = (id, event) => {
    event.preventDefault();
    setIsSelected(id);
    dispatch(getUserLogs(id));
    dispatch(setLogsTabOn());
  };

  const onCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked([...isChecked, id]);
  };

  const unCheckHandler = (id, event) => {
    event.preventDefault();
    setIsChecked(isChecked.filter((element) => element !== id));
  };

  // Settings Panel Handlers

  const onAddHandler = () => {
    dispatch(setRegisterUserTabOn());
  };

  const onCloseHandler = () => {
    dispatch(setUsersTabOff());
  };

  const onGearHandler = () => {
    setIsEdit(!isEdit);
  };

  const onDeleteHandler = () => {
    if (isChecked.length > 0) {
      isChecked.forEach((element) => dispatch(deleteUser(element)));
    } else {
      toast.error("User for deleting is not selected!");
    }
  };

  const list = item.map((element, index) => {
    return (
      <div style={{ display: "flex" }} key={uniqid()}>
        {isEdit ? (
          <CheckBox
            onCheckHandler={onCheckHandler}
            id={element._id}
            isChecked={isChecked.includes(element._id) ? true : false}
            unCheckHandler={unCheckHandler}
          />
        ) : null}
        <ListElem
          key={uniqid()}
          style={
            index === isSelected
              ? {
                  backgroundColor: theme.colors.primary.main,
                  color: theme.colors.text.onPrimary,
                }
              : null
          }
          onClick={(event) => onClickHandler(element._id, event)}
        >
          <p>
            {element.username} / {element.name}
          </p>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        hideUnArchive
        isEdit={isEdit}
        onAdd={onAddHandler}
        onClose={onCloseHandler}
        onDelete={onDeleteHandler}
        onSettings={onGearHandler}
      />
      <StyledSeparator />
      {ru ? <h2>Пользователи:</h2> : null}
      {en ? <h2>Users:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default UsersListCard;
