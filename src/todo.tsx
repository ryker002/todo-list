import {
  Box,
  CheckboxIcon,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import db, { Todo as TodoType } from "./util/low";
import { IconCheckbox, IconTrash, IconSquare } from "@tabler/icons";
import { useState } from "react";
import _ from "lodash";
import { motion } from "framer-motion";
import { useTodoStore } from "./hooks/useTodoStore";

export default function Todo({ id, completed, content }: TodoType) {
  const { dispatch } = useTodoStore();
  const [isHover, setHover] = useState(false);
  function onChecked() {
    dispatch(
      { id: id, completed: !completed, date_completed: new Date() },
      { type: "patch" }
    );
  }
  async function onDelete() {
    dispatch(id, { type: "remove" });
  }
  function onEdit(value: string) {
    dispatch({ id: id, content: value }, { type: "patch" });
  }

  return (
    <Flex
      p={8}
      shadow='md'
      rounded='sm'
      w='100%'
      alignItems='center'
      gap={5}
      mb={1}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      backgroundColor={completed ? "green.500" : "white"}
      color={completed ? "white" : "initial"}
      as={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -200 }}
    >
      <IconButton
        icon={completed ? <IconCheckbox /> : <IconSquare />}
        variant='ghost'
        colorScheme={completed ? "white" : "green"}
        aria-label='Mark Todo as Completed'
        opacity={isHover || completed ? 1 : 0}
        onClick={() => onChecked()}
      />
      <Editable
        defaultValue={content}
        flex={1}
        onSubmit={(value) => onEdit(value)}
      >
        <EditablePreview />
        <EditableTextarea noOfLines={1} />
      </Editable>
      {/* {content} */}
      <IconButton
        aria-label='Remove this Todo'
        variant='ghost'
        colorScheme='red'
        opacity={isHover ? 1 : 0}
        icon={<IconTrash />}
        onClick={() => onDelete()}
      />
    </Flex>
  );
}
