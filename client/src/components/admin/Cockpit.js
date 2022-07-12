import { StyledCockpit } from "../styles/Cockpit.styled";
import { Button } from "../../components/styles/Button.styled";
import { Flex } from "../styles/Flex.styled";
import theme from "../../theme/index.js";
const Cockpit = (props) => {
  // const styled = {
  //   textAlign: 'right',
  //   margin: 0,
  // };
  const { addNewUserSwitch } = props;
  return (
    <StyledCockpit>
      <Flex>
        <Button>Users</Button>
        <Button>Availible Quizes</Button>
        <Button>Create New Quiz</Button>
        <Button onClick={addNewUserSwitch}>Add New User</Button>
      </Flex>
    </StyledCockpit>
  );
};

export default Cockpit;
