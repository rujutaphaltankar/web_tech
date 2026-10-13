import { createContext, useContext, useState } from "react";

const TodoContext = createContext(null);

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Study state management", completed: false }
  ]);

  function addTask(text) {
    const cleanText = text.trim();
    if (!cleanText) return;

    setTasks((previous) => [
      ...previous,
      { id: Date.now(), text: cleanText, completed: false }
    ]);
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
}

function TodoForm() {
  const [text, setText] = useState("");
  const { addTask } = useContext(TodoContext);

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter a task"
        aria-label="New task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TodoList() {
  const { tasks, toggleTask, deleteTask } = useContext(TodoContext);

  if (tasks.length === 0) return <p className="empty">No tasks yet. Add one above.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label className="task-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? "completed" : ""}>{task.text}</span>
          </label>
          <button className="delete" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function ContextTodo() {
  return (
    <section>
      <h2>useState + Context API</h2>
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </section>
  );
}
