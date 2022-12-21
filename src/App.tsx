import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useTodoStore } from "./hooks/useTodoStore";
import Layout from "./layout";
import TodoSkeleton from "./skeleton";
import db, { Todo as TodoType } from "./util/low";
import { Reorder } from "framer-motion";

const Todo = lazy(() => import("./todo"));

type FormData = {
  content: string;
};

function App() {
  const todos = db.chain.get("todos").value();
  const { values, dispatch, handlers } = useTodoStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const date = new Date();
    let newTodo = {
      id: uuidv4(),
      content: data.content,
      date_created: date,
      completed: false,
      date_completed: null,
    };

    dispatch(newTodo, { type: "add" });
    reset();
  }

  function reorder(value: TodoType[]) {
    handlers.setState(value);
    db.data = { todos: value };
    db.write();
  }

  return (
    <Layout>
      <Heading
        textAlign='center'
        bgGradient='linear(to-l, red.500, red.300)'
        bgClip='text'
        fontWeight='extrabold'
        textTransform='uppercase'
      >
        Todo List
      </Heading>
      <Box mt={2} as='form' onSubmit={handleSubmit(onSubmit)}>
        <FormControl id='todo-content'>
          <FormLabel
            htmlFor='todo-content'
            textAlign='center'
            bgGradient='linear(to-l, red.500, red.300)'
            bgClip='text'
            fontWeight='extrabold'
            textTransform='uppercase'
          >
            Enter a new Todo
          </FormLabel>
          <Input {...register("content", { required: true })} />
          <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
        </FormControl>
        <Center>
          <Button mt={5} colorScheme='red' type='submit'>
            Add Todo
          </Button>
        </Center>
      </Box>
      <Box as='section' aria-label='Todo List' mt={5}>
        <Suspense fallback={<TodoSkeleton />}>
          <AnimatePresence>
            <Reorder.Group
              axis='y'
              values={todos}
              onReorder={reorder}
              as={"div"}
            >
              {values?.map((todo) => (
                <Reorder.Item key={todo.id} value={todo} as='div'>
                  <Todo {...todo} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </AnimatePresence>
        </Suspense>
      </Box>
    </Layout>
  );
}

export default App;
