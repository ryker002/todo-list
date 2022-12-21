import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons";
import { ReactNode } from "react";
import { useTodoStore } from "../hooks/useTodoStore";
import db from "../util/low";

export default function Layout({ children }: { children: ReactNode }) {
  const todos = db.chain.get("todos").value();
  const { dispatch } = useTodoStore();

  function clearCompleted() {
    try {
      const completed = todos.filter((e) => e.completed === true);
      if (completed.length >= 1)
        completed.forEach((todo) => dispatch(todo.id, { type: "remove" }));
      else console.log("No Completed Todo's to Remove");
    } catch {
      console.log("No Completed Todo's to Remove");
    }
  }
  function clearAll() {
    try {
      if (todos.length >= 1)
        todos.forEach((todo) => dispatch(todo.id, { type: "remove" }));
      else console.log("No Todo's to Clear");
    } catch {
      throw Error("Can't Delete Todos");
    }
  }

  return (
    <>
      <Box backgroundColor='red.500'>
        <Container maxW='container.xl'>
          <Flex justifyContent='flex-end' alignItems='center' height={100}>
            <Menu>
              <MenuButton as={Button} rightIcon={<IconChevronDown />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem onClick={clearCompleted}>Clear Completed</MenuItem>
                <MenuItem onClick={clearAll}>Clear All</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Container>
      </Box>
      <Box as='main' marginBottom={200}>
        <Container py={20}>{children}</Container>
      </Box>
    </>
  );
}
