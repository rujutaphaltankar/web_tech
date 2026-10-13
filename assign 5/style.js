 {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0b0f19;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

#canvas {
  display: block;
  width: 100%;
  height: 100%;
}

#ui-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

#score-board {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

#game-over-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(15, 23, 42, 0.95);
  border: 2px solid #ef4444;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  pointer-events: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  min-width: 300px;
}

#game-over-screen h1 {
  margin: 0 0 10px 0;
  color: #ef4444;
  letter-spacing: 3px;
}

#game-over-screen p {
  font-size: 1.2rem;
  margin: 0 0 20px 0;
  color: #94a3b8;
}

#restart-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

#restart-btn:hover {
  background: #059669;
}

.hidden {
  display: none !important;
}