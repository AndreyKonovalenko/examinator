import moment from "moment";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { IconStyled } from "../styles/Icon.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme/index.js";
import uniqid from "uniqid";

const LogListCardAdmin = (props) => {
  const {
    en,
    ru,
    isEditHandlerLogs,
    isEditLogsList,
    deleteLogsHandler,
    logChecked,
    logCheckedHandler,
    logUnCheckHandler,
  } = props;
  const list = props.item.map((element) => {
    let checked = false;
    if (logChecked.includes(element._id)) {
      checked = true;
    }
    const score = (
      (Number.parseInt(element.result) /
        Number.parseInt(element.quiz.questions.length)) *
      100
    ).toFixed(0);
    const etemptTime = moment(element.updatedAt).format("HH:mm:ss/DD.MM.YYYY");

    const succes = {
      color: theme.colors.primary.light,
    };
    const fail = {
      color: theme.colors.error,
    };

    return (
      <div style={{ display: "flex" }} key={uniqid()}>
        {isEditLogsList ? (
          <div style={{ margin: "auto", marginRight: "5px" }}>
            <IconStyled
              bg={theme.colors.surface}
              color={theme.colors.primary.light}
            >
              {checked ? (
                <MdCheckBox
                  size={"2em"}
                  onClick={(event) => logUnCheckHandler(element._id, event)}
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  size={"2em"}
                  onClick={(event) => logCheckedHandler(element._id, event)}
                />
              )}
            </IconStyled>
          </div>
        ) : null}

        <ListElem
          key={uniqid()}
          onClick={(event) => props.onClick(element, event)}
        >
          {ru ? <p>Тема: {element.quiz.title}</p> : null}
          {en ? <p>Quiz: {element.quiz.title}</p> : null}
          {ru ? (
            <p style={score >= 80 ? succes : fail}>
              Тест {score >= 80 ? "пройден успешно" : "провален"} с результатом{" "}
              {score}%, правильных ответов: {element.result} из{" "}
              {element.quiz.questions.length}
            </p>
          ) : null}
          {en ? (
            <p style={score >= 80 ? succes : fail}>
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
        onSettings={isEditHandlerLogs}
        isEdit={isEditLogsList}
        onDelete={deleteLogsHandler}
      />
      <StyledSeparator />
      {ru ? <h2>История:</h2> : null}
      {en ? <h2>User history:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default LogListCardAdmin;
