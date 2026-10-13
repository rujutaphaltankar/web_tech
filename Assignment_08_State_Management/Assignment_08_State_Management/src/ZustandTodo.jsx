import { useState } from "react";
import { create } from "zustand";

const useTodoStore = create((set) => ({
  tasks: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Study state management", completed: false }
  ],

  addTask: (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), text: cleanText, completed: false }]
    }));
  },

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }))
}));

function TodoForm() {
  const [text, setText] = useState("");
  const addTask = useTodoStore((state) => state.addTask);

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
  const tasks = useTodoStore((state) => state.tasks);
  const toggleTask = useTodoStore((state) => state.toggleTask);
  const deleteTask = useTodoStore((state) => state.deleteTask);

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

export default function ZustandTodo() {
  return (
    <section>
      <h2>Zustand</h2>
      <TodoForm />
      <TodoList />
    </section>
  );
}
