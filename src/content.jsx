import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "my-todo-root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
