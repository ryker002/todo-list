import lodash from "lodash";
import { LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser";

export type Todo = {
  id: string;
  completed: boolean;
  date_created: Date;
  date_completed: Date | null;
  content: string;
};

export type Data = {
  todos: Todo[];
};

class LowWithLodash<T> extends LowSync<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

// export default const db = new Low(new JSONFile("db.json"));
// const adapter = new Memory<Data>();
const adapter = new LocalStorage<Data>("todos");
const db = new LowWithLodash<Data>(adapter);

db.data ||= { todos: [] };
db.read();

export default db;
