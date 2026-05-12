import "./TaskList.css";

const uncheckedIcon = chrome.runtime.getURL("images/unchecked.png");
const checkedIcon = chrome.runtime.getURL("images/checked.png");

function TaskList({
  data: { editEmoji, copyEmoji, copyMessege, deletedEmoji },
  tasks,
  toggleTask,
  deleteTask,
  changeColor,
  copyTask,
  copiedIndex,
  editTask,
  saveTask,
  setTasks,
}) {
  return (
    <ul className="todo-ext-list-container">
      {tasks.map((task, index) => (
        <li key={index} className={task.checked ? "todo-ext-checked" : ""}>
          <img
            src={task.checked ? checkedIcon : uncheckedIcon}
            alt={task.checked ? "Checked" : "Unchecked"}
            className="todo-ext-checkbox"
            onClick={() => toggleTask(index)}
          />

          <div className="todo-ext-task-row">
            <span
              className="todo-ext-task-text"
              style={{
                backgroundColor: task.color || "",
              }}
            >
              {task.text}
            </span>
            <div className="todo-ext-task-actions">
              <span
                className="todo-ext-edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  editTask(index);
                }}
              >
                {editEmoji}
              </span>
              <div className="todo-ext-copy-container">
                <span
                  className="todo-ext-copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyTask(index);
                  }}
                >
                  {copyEmoji}
                </span>
                {copiedIndex === index && (
                  <span className="todo-ext-copy-msg">{copyMessege}</span>
                )}
              </div>
              <input
                type="color"
                className="todo-ext-change-color"
                value={task.color || "#ffffff"}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => changeColor(index, e.target.value)}
              />
              <span
                className="todo-ext-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                {deletedEmoji}
              </span>
            </div>
          </div>
          {task.isEditing && (
            <input
              type="text"
              name="edit-input"
              value={task.text}
              className="todo-ext-edit-input"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const updatedTasks = [...tasks];
                updatedTasks[index].text = e.target.value;
                setTasks(updatedTasks);
              }}
              onBlur={() => saveTask(index, task.text)}
              autoFocus
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
