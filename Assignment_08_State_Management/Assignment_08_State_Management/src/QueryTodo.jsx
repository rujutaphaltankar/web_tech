import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Simulated server data. This is reset when the page is fully reloaded.
let serverTasks = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Study state management", completed: false }
];

const api = {
  getTasks: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return serverTasks.map((task) => ({ ...task }));
  },

  addTask: async (text) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const task = { id: Date.now(), text, completed: false };
    serverTasks = [...serverTasks, task];
    return task;
  },

  toggleTask: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    serverTasks = serverTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    return serverTasks.map((task) => ({ ...task }));
  },

  deleteTask: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    serverTasks = serverTasks.filter((task) => task.id !== id);
    return serverTasks.map((task) => ({ ...task }));
  }
};

export default function QueryTodo() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: api.getTasks
  });

  const addMutation = useMutation({
    mutationFn: api.addTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setText("");
    }
  });

  const toggleMutation = useMutation({
    mutationFn: api.toggleTask,
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(["tasks"], updatedTasks);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(["tasks"], updatedTasks);
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    const cleanText = text.trim();
    if (cleanText) addMutation.mutate(cleanText);
  }

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p role="alert">Failed to load tasks.</p>;

  return (
    <section>
      <h2>TanStack Query</h2>
      <p className="note">Tasks are managed through a simulated API.</p>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter a task"
          aria-label="New task"
        />
        <button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? "Adding..." : "Add Task"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleMutation.mutate(task.id)}
                  disabled={toggleMutation.isPending}
                />
                <span className={task.completed ? "completed" : ""}>{task.text}</span>
              </label>
              <button
                className="delete"
                onClick={() => deleteMutation.mutate(task.id)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
