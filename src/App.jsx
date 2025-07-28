import Main from "./components/Main/Main";

const data = {
  title: "Advanced To-Do List",
  textButton: "Add",
  inputPlaceholderFirstState: "Add your task",
  inputPlaceholderSecondState: "Please, add task",
  deletedEmoji: "❌",
  copyEmoji: "📋",
  editEmoji: "✏️",
  copyMessege: "Copied!✅",
  hide: "👇",
  show: "👆",
  dragIcon: "🖐️🖐️",
};

function App() {
  return (
    <>
      <Main data={data} />
    </>
  );
}

export default App;
