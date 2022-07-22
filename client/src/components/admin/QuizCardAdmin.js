import moment from "moment";
import { StyledListCard } from "../styles/ListCard.styled";
import { ListElem } from "../styles/ListElem.styled";
import { StyledSeparator } from "../styles/Separator.styled";
import CheckBox from "./CheckBox";
import SettingPanel from "./SettingsPanel";
import theme from "../../theme/index.js";
import uniqid from "uniqid";

const QuizCardAdmin = (props) => {
  const { en, ru, item } = props;
  const list = item.questions.map((element) => {
    // let checked = false;
    // if (logChecked.includes(element._id)) {
    //   checked = true;
    // }

    return (
      <div style={{ display: "flex" }} key={uniqid()}>
        {/* {isEditLogsList ? (
          <CheckBox
            isChecked={checked}
            id={element._id}
            checkedHandler={logCheckedHandler}
            unCheckHandler={logUnCheckHandler}
          />
        ) : null} */}

        <ListElem key={uniqid()}></ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      <StyledSeparator />
      {ru ? <h2>История:</h2> : null}
      {en ? <h2>User history:</h2> : null}
      {list}
    </StyledListCard>
  );
};

export default QuizCardAdmin;
