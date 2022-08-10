import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Button, Conteiner, STextarea, Flex } from "../styles/Textarea.styled";
import { addToOptions } from "../../features/ui/uiSlice";

const Textarea = (props) => {
  const dispatch = useDispatch();
  const { onSave, en, ru, maxLength, id, save, value } = props;
  // const [data, setData] = useState("");
  const textAreaRef = useRef(null);

  // const onChange = (event) => {
  //   event.preventDefault();
  //   //   dispatch(addToOptions({ id: id, data: event.target.value }));
  //   setData(event.target.value);
  //   dispatch(addToOptions({ id: id, data: event.target.value }));
  // };

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  // const onClear = () => {
  //   setData("");
  // };

  // const onSaveHandler = () => {
  //   if (data !== "") {
  //     onSave({ data });
  //   }
  // };

  useEffect(() => {
    console.log("rerendering");
    resizeTextArea();
  });

  return (
    <Conteiner>
      <STextarea
        id={id}
        ref={textAreaRef}
        value={value}
        onChange={() => {}}
        maxLength={maxLength}
      />
      <Flex style={{ justifyContent: "flex-end" }}>
        {save ? (
          <Button onClick={() => {}}>
            {ru ? "Сохранить" : null} {en ? "Save" : null}
          </Button>
        ) : null}
        <Button onClick={() => {}}>
          {ru ? "Очистить" : null} {en ? "Clear" : null}
        </Button>
      </Flex>
    </Conteiner>
  );
};

export default Textarea;
