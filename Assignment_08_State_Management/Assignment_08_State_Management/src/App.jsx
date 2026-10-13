import { useState } from "react";
import ContextTodo from "./ContextTodo";
import ZustandTodo from "./ZustandTodo";
import QueryTodo from "./QueryTodo";

export default function App() {
  const [version, setVersion] = useState("context");

  return (
    <main className="container">
      <h1>To-Do Application</h1>
      <p className="subtitle">State Management Comparison</p>

      <nav className="tabs" aria-label="State management approaches">
        <button
          className={version === "context" ? "active" : ""}
          onClick={() => setVersion("context")}
        >
          useState + Context
        </button>
        <button
          className={version === "zustand" ? "active" : ""}
          onClick={() => setVersion("zustand")}
        >
          Zustand
        </button>
        <button
          className={version === "query" ? "active" : ""}
          onClick={() => setVersion("query")}
        >
          TanStack Query
        </button>
      </nav>

      {version === "context" && <ContextTodo />}
      {version === "zustand" && <ZustandTodo />}
      {version === "query" && <QueryTodo />}
    </main>
  );
}
