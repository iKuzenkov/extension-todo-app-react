import "./InputRow.css";

function InputRow({
  data: { textButton },
  inputValue,
  placeholder,
  setInputValue,
  addTask,
}) {
  return (
    <>
      <div className="todo-ext-row">
        <input
          type="text"
          className="todo-ext-input-row"
          name="task"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="todo-ext-button-row" onClick={addTask}>
          {textButton}
        </button>
      </div>
    </>
  );
}

export default InputRow;
