import { StatusBage, Container } from "../styles/StatusBage.styled";

const Bage = (props) => {
  const { text } = props;
  return (
    <Container>
      <StatusBage>{text}</StatusBage>
    </Container>
  );
};

export default Bage;
