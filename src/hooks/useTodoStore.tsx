import { useListState } from "@mantine/hooks";
import _ from "lodash";
import { createContext, ReactNode, useContext } from "react";
import db, { Todo } from "../util/low";

export const TodoStoreContext = createContext<Todo[]>([]);

export function TodoStoreProvider({ children }: { children: ReactNode }) {
  const todos = db.chain.get("todos").value();
  const [values, handlers] = useListState<Todo>(todos);

  return (
    <TodoStoreContext.Provider value={{ values, handlers }}>
      {children}
    </TodoStoreContext.Provider>
  );
}

export function useTodoStore() {
  const { values, handlers } = useContext(TodoStoreContext);
  const dispatch = (data, action) => {
    switch (action.type) {
      case "add": {
        handlers.append(data);
        db?.data?.todos.push(data);
        db.write();
        break;
      }
      case "remove": {
        const index = db.chain.get("todos").findIndex({ id: data }).value();
        const todos = db.chain.get("todos").value();
        handlers.remove(index, index);
        _.remove(todos, (todo) => todo.id === data);
        db.write();
        break;
      }
      case "patch": {
        const { id, ...rest } = data;
        const index = db.chain.get("todos").findIndex({ id: id }).value();
        Object.keys(rest).map((e) => handlers.setItemProp(index, e, rest[e]));
        db.chain.get("todos").find({ id: id }).assign(rest).value();
        db.write();
      }
      default:
        break;
    }
  };
  return { values, dispatch, handlers };
}
