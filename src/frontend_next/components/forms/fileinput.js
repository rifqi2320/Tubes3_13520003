import { Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function FileInput({ onChange, children, ...props }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const changeFile = (e) => {
    setFileName(e.target.files[0].name);
    onChange(e);
  };

  return (
    <>
      <HStack>
        <Button
          {...props}
          onClick={(e) => {
            inputRef.current.click();
          }}
        >
          Choose File
        </Button>
        <Text>{fileName}</Text>
      </HStack>
      <Input type="file" ref={inputRef} display="none" onChange={changeFile} />
    </>
  );
}
