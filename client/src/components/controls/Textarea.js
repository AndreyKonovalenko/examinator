import { useEffect, useState, useRef } from "react";
import { Button, Conteiner, STextarea, Flex } from "../styles/Textarea.styled";

const Textarea = (props) => {
  const { onSave, en, ru, maxLength, id, save } = props;
  const [data, setData] = useState("");
  const textAreaRef = useRef(null);

  const onChange = (event) => {
    event.preventDefault();
    setData(event.target.value);
  };

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const onClear = () => {
    setData("");
  };

  const onSaveHandler = () => {
    if (data !== "") {
      onSave({ data });
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, [data]);

  return (
    <Conteiner>
      <STextarea
        id={id}
        ref={textAreaRef}
        value={data}
        onChange={onChange}
        maxLength={maxLength}
      />
      <Flex style={{ justifyContent: "flex-end" }}>
        {save ? (
          <Button onClick={onSaveHandler}>
            {ru ? "Сохранить" : null} {en ? "Save" : null}
          </Button>
        ) : null}
        <Button onClick={onClear}>
          {ru ? "Очистить" : null} {en ? "Clear" : null}
        </Button>
      </Flex>
    </Conteiner>
  );
};

export default Textarea;
