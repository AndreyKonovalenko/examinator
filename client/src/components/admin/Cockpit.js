import { StyledCockpit } from "../styles/Cockpit.styled";
import { Button } from "../../components/styles/Button.styled";
import { Flex } from "../styles/Flex.styled";
const Cockpit = (props) => {
  // const styled = {
  //   textAlign: 'right',
  //   margin: 0,
  // };
  const { addNewUserSwitch, usersSwitch, quizzesSwitch } = props;
  return (
    <StyledCockpit>
      <Flex>
        <Button onClick={usersSwitch}>Users</Button>
        <Button onClick={quizzesSwitch}>Availible Quizes</Button>
        <Button>Create New Quiz</Button>
        <Button onClick={addNewUserSwitch}>Add New User</Button>
      </Flex>
    </StyledCockpit>
  );
};

export default Cockpit;
