import { useDispatch } from "react-redux";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { StyledSeparator } from "../styles/Separator.styled";

import moment from "moment";
import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme/index.js";
import uniqid from "uniqid";
import { toast } from "react-toastify";

const LogsListCardAdmin = (props) => {
  const dispatch = useDispatch();
  const { en, item, ru } = props;

  const [isSelected, setIsSelected] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // List Hadlers

  const onClickHandler = (args, event) => {
    event.preventDefault();
    setIsSelected(args[1]);
    dispatch(getUserLogs(args[0]));
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

  // const onAddHandler = () => {
  //   dispatch(());
  // };

  const onCloseHandler = () => {
    dispatch(setUsersTabOff());
  };

  const onGearHandler = () => {
    if (item.length === 0) {
      toast.error("Nothing to edit");
    }
    if (item.length > 0) {
      setIsEdit(!isEdit);
    }
  };

  const onDeleteHandler = () => {
    if (isChecked.length > 0) {
      isChecked.forEach((element) => dispatch(deleteUser(element)));
    } else {
      toast.error("User for deleting is not selected!");
    }
  };

  const list = item.map((element) => {
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.quiz.questions.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format("HH:mm:ss/DD.MM.YYYY");

    const success = {
      color: theme.colors.primary.light,
    };

    const fail = {
      color: theme.colors.error,
    };

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
          onClick={(event) => onClickHandler(element._id, event)}
          style={
            index === isSelected
              ? {
                  backgroundColor: theme.colors.primary.main,
                  color: theme.colors.text.onPrimary,
                }
              : null
          }
        >
          {ru ? <p>Тема: {element.quiz.title}</p> : null}
          {en ? <p>Quiz: {element.quiz.title}</p> : null}
          {ru ? (
            <p style={score >= 80 ? success : fail}>
              Тест {score >= 80 ? "пройден успешно" : "провален"} с результатом{" "}
              {score}%, правильных ответов: {element.result} из{" "}
              {element.quiz.questions.length}
            </p>
          ) : null}
          {en ? (
            <p style={score >= 80 ? success : fail}>
              {score >= 80 ? "You have succeeded" : "You have failed"} with{" "}
              {score}%, correct answers: {element.result} out of{" "}
              {element.quiz.questions.length}
            </p>
          ) : null}
          <p>{etemptTime}</p>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <SettingPanel
        isEdit={isEdit}
        onAdd={hidden}
        onClose={onCloseHandler}
        onDelete={onDeleteHandler}
        onSettings={onGearHandler}
      />
      <StyledSeparator />
      {ru ? <h2>История:</h2> : null}
      {en ? <h2>User history:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default LogsListCardAdmin;
