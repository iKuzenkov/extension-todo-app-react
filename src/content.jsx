import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "my-todo-root";
document.body.appendChild(rootElement);

function RootWrapper() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onMessage(msg, sender, sendResponse) {
      if (msg.action === "toggle-todo-panel") {
        if (typeof msg.panelVisible === "boolean") {
          setVisible(msg.panelVisible);
        } else {
          setVisible((v) => !v);
        }
      } else if (msg.action === "get-todo-panel-state") {
        sendResponse({ panelVisible: visible });
        return true;
      }
    }

    chrome.runtime.onMessage.addListener(onMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(onMessage);
    };
  }, [visible]);

  return visible ? <App /> : null;
}

const root = createRoot(rootElement);
root.render(<RootWrapper />);
