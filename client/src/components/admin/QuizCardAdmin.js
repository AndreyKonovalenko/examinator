import moment from 'moment';
import { StyledListCard } from '../styles/ListCard.styled';
import { ListElem } from '../styles/ListElem.styled';
import { StyledSeparator } from '../styles/Separator.styled';
import CheckBox from './CheckBox';
import SettingPanel from './SettingsPanel';
import theme from '../../theme/index.js';
import uniqid from 'uniqid';

const QuizCardAdmin = (props) => {
  const { en, ru, item } = props;
  const list = item.questions.map((element) => {
    // let checked = false;
    // if (logChecked.includes(element._id)) {
    //   checked = true;
    // }

    const optionList = element.options.map((el, index) => (
      <li
        key={uniqid()}
        style={
          index === element.currect - 1
            ? { color: theme.colors.primary.light }
            : null
        }>
        {el}
      </li>
    ));

    return (
      <div style={{ display: 'flex' }} key={uniqid()}>
        {/* {isEditLogsList ? (
          <CheckBox
            isChecked={checked}
            id={element._id}
            checkedHandler={logCheckedHandler}
            unCheckHandler={logUnCheckHandler}
          />
        ) : null} */}

        <ListElem key={uniqid()}>
          <h3>{element.question}</h3>
          <ul>{optionList}</ul>
        </ListElem>
      </div>
    );
  });

  return (
    <StyledListCard>
      {ru ? <p>всeго: {item.questions.length}</p> : null}
      {en ? <p>total: {item.questions.length}</p> : null}
      <StyledSeparator />
      {list}
    </StyledListCard>
  );
};

export default QuizCardAdmin;
