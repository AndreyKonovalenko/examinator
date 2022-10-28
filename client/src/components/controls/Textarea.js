import { useEffect, useState, useRef } from "react";
import { Button, Conteiner, STextarea, Flex } from "../styles/Textarea.styled";

const Textarea = (props) => {
  const {
    onSave,
    en,
    ru,
    maxLength,
    id,
    save,
    defaultValue,
    styleOption,
    type,
  } = props;

  const [data, setData] = useState(defaultValue);
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

  useEffect(() => {
    resizeTextArea();
  });

  return (
    <Conteiner style={styleOption}>
      <STextarea
        id={id}
        ref={textAreaRef}
        value={data}
        onChange={onChange}
        maxLength={maxLength}
        type={type}
      />
      <Flex style={{ justifyContent: "flex-end" }}>
        {save ? (
          <Button onClick={onSave}>
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
