import React, { useEffect, useRef, useState } from "react";

import "./Main.css";

import InputRow from "../InputRow/InputRow";
import TaskList from "../TaskList/TaskList";

import gitHubIcon from "../images/github.png";
import websiteIcon from "../images/website.png";
import donateIcon from "../images/donate.png";
import gmailIcon from "../images/gmail.png";
import autoclick from "../images/autoclick.png";

function Main({ data }) {
  const {
    inputPlaceholderFirstState,
    inputPlaceholderSecondState,
    title,
    hide,
    show,
    dragIcon,
  } = data;

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState(inputPlaceholderFirstState);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const panelRef = useRef(null);
  const dragHandleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const wrapper = panelRef.current;
    const dragHandle = dragHandleRef.current;
    if (!wrapper || !dragHandle) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e) => {
      if (!dragHandle.contains(e.target)) return;

      isDragging = true;
      offsetX = e.clientX - wrapper.offsetLeft;
      offsetY = e.clientY - wrapper.offsetTop;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const parentWidth = window.innerWidth;
      const parentHeight = window.innerHeight;

      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;

      if (newLeft < 0) newLeft = 0;

      if (newLeft + wrapperRect.width > parentWidth) {
        newLeft = parentWidth - wrapperRect.width;
      }

      if (newTop < 0) newTop = 0;

      if (newTop + wrapperRect.height > parentHeight) {
        newTop = parentHeight - wrapperRect.height;
      }

      wrapper.style.left = `${newLeft}px`;
      wrapper.style.top = `${newTop}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousedown", onMouseDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const addTask = () => {
    if (inputValue.trim() === "") {
      setPlaceholder(inputPlaceholderSecondState);
      return;
    } else {
      const newTask = {
        text: inputValue,
        checked: false,
        color: "",
        isEditing: false,
      };

      setTasks([...tasks, newTask]);
      setInputValue("");
      setPlaceholder(inputPlaceholderFirstState);
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (index === i) {
        return { ...task, checked: !task.checked };
      } else {
        return task;
      }
    });

    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const saveTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, text: newText, isEditing: false };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const lastEffect = (index) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  const copyTask = async (index) => {
    const taskToCopy = tasks[index];
    if (taskToCopy) {
      await navigator.clipboard.writeText(taskToCopy.text);
      lastEffect(index);
    }
  };

  const changeColor = (index, color) => {
    const updatedTasks = tasks.map((task, i) => {
      return i === index ? { ...task, color } : task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => {
      return i !== index;
    });

    setTasks(updatedTasks);
  };
  return (
    <>
      <div className="todo-ext-draggable-wrapper" ref={panelRef}>
        <div className="todo-ext-todo-app">
          <div className="todo-ext-title">
            <h2>{title}</h2>
          </div>
          <div className="todo-ext-drag-icon" ref={dragHandleRef}>
            {dragIcon}
          </div>
          <button
            className="todo-ext-hide-show"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? `${hide}` : `${show}`}
          </button>
          <InputRow
            data={data}
            inputValue={inputValue}
            placeholder={placeholder}
            setInputValue={setInputValue}
            addTask={addTask}
          />
          {!collapsed && (
            <TaskList
              data={data}
              tasks={tasks}
              toggleTask={toggleTask}
              editTask={editTask}
              setTasks={setTasks}
              saveTask={saveTask}
              copyTask={copyTask}
              copiedIndex={copiedIndex}
              changeColor={changeColor}
              deleteTask={deleteTask}
            />
          )}
          <div className="todo-ext-info">
            <a
              href="https://github.com/iKuzenkov/todo-app-react"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={gitHubIcon} alt="GitHub" title="GitHub" />
            </a>

            <a
              href="https://browser-extensions-hub.vercel.app/to-do"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={websiteIcon} alt="Website" title="Website" />
            </a>

            <a
              href="https://browser-extensions-hub.vercel.app/donate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={donateIcon} alt="Donate" title="Donate" />
            </a>

            <a
              href="https://browser-extensions-hub.vercel.app/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={gmailIcon} alt="Gmail" title="Gmail" />
            </a>

            <a
              href="https://chromewebstore.google.com/detail/mgadnfjigmdiljhffhjlopjfibddkneh?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={autoclick}
                alt="autoclick extansion"
                title="Autoclick Extansion"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
