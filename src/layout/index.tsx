import { Box, Button, Container, Flex, IconButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons";
import db from "../util/low";
import { useTodoStore } from "../hooks/useTodoStore";

export default function Layout({ children }: { children: ReactNode }) {
  const todos = db.chain.get("todos").value();
  const { values, dispatch, handlers } = useTodoStore();

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
                <MenuItem>Download a Copy</MenuItem>
                <MenuItem onClick={clearCompleted}>Clear Completed</MenuItem>
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
