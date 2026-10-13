# Assignment 08: State Management Comparison

This project implements the same To-Do application using:
1. React `useState` + Context API
2. Zustand
3. TanStack Query (with a simulated in-memory API)

## Run the project

Install Node.js if it is not already installed. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Benchmark with React DevTools Profiler

1. Install the React Developer Tools browser extension.
2. Open the application and open browser DevTools.
3. Select the **Profiler** tab and start recording.
4. Perform the same operations in each version: add a task, complete a task, and delete a task.
5. Stop recording and note commits, components rendered, and render duration.
6. Repeat under similar conditions and record your actual measurements in the assignment report.

## Notes

- The TanStack Query example uses a simulated in-memory API. Data is not persisted after a full page reload.
- Use actual Profiler observations in your report; do not assume one approach is always fastest.
- React Strict Mode is enabled in development and may affect development render observations.
