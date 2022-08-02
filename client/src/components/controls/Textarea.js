import { Button } from "../styles/Textarea.styled";

const Textarea = (props) => {
  const { onSave, en, ru } = props;
  return (
    <div>
      <textarea />
      <div>
        <Button onClick={() => onSave()}>
          {ru ? "Сохранить" : null} {en ? "Save" : null}
        </Button>
        <Button>
          {ru ? "Очистить" : null} {en ? "Clear" : null}
        </Button>
      </div>
    </div>
  );
};

export default Textarea;
