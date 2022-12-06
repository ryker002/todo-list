import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { TodoStoreProvider } from "./hooks/useTodoStore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <TodoStoreProvider>
        <App />
      </TodoStoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);
