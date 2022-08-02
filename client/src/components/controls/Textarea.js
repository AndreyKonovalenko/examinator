import { Button, Conteiner, STextarea, Flex } from "../styles/Textarea.styled";

const Textarea = (props) => {
  const { onSave, en, ru } = props;
  return (
    <Conteiner>
      <h3>
        {ru ? "Придумайте тему нового тестирования" : null}
        {en ? "Choose new quiz titel" : null}
      </h3>

      <STextarea />
      <Flex style={{ justifyContent: "flex-end" }}>
        <Button onClick={() => onSave()}>
          {ru ? "Сохранить" : null} {en ? "Save" : null}
        </Button>
        <Button>
          {ru ? "Очистить" : null} {en ? "Clear" : null}
        </Button>
      </Flex>
    </Conteiner>
  );
};

export default Textarea;
