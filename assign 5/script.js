const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreVal = document.getElementById('score-val');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Game State variables
let score = 0;
let isGameOver = false;
let animationFrameId;

let enemies = [];
let items = [];
let spawnTimer = 0;

// Set dynamic canvas sizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Entity Definitions
const player = {
  x: canvas.width / 2,
  y: canvas.height * 0.8,
  size: 24,
  targetX: canvas.width / 2,
  targetY: canvas.height * 0.8,
  ease: 0.15,
  color: '#00f2fe'
};

// Track mouse position coordinates
window.addEventListener('mousemove', (e) => {
  player.targetX = e.clientX;
  player.targetY = e.clientY;
});

// Mobile touch implementation
window.addEventListener('touchmove', (e) => {
  if(e.touches.length > 0) {
    player.targetX = e.touches[0].clientX;
    player.targetY = e.touches[0].clientY;
  }
});

function spawnEntities() {
  spawnTimer++;
  
  // Spawn an enemy block roughly every 30 frames
  if (spawnTimer % 30 === 0) {
    enemies.push({
      x: Math.random() * (canvas.width - 30),
      y: -30,
      size: 20 + Math.random() * 25,
      speed: 4 + Math.random() * 5,
      color: '#ef4444'
    });
  }

  // Spawn a collectible point item roughly every 70 frames
  if (spawnTimer % 70 === 0) {
    items.push({
      x: Math.random() * (canvas.width - 20),
      y: -20,
      size: 14,
      speed: 3,
      color: '#10b981'
    });
  }
}

// Basic AABB Rectangle Collision Detection
function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.size &&
         rect1.x + rect1.size > rect2.x &&
         rect1.y < rect2.y + rect2.size &&
         rect1.y + rect1.size > rect2.y;
}

function updateGame() {
  // 1. Smoothly transition player position towards cursor (Lerp)
  player.x += (player.targetX - player.x - player.size / 2) * player.ease;
  player.y += (player.targetY - player.y - player.size / 2) * player.ease;

  // 2. Generate new obstacles and items
  spawnEntities();

  // 3. Move and manage danger blocks
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].y += enemies[i].speed;

    // Player hits an enemy
    if (checkCollision(player, enemies[i])) {
      endGame();
    }

    // Clean up out of bounds elements
    if (enemies[i].y > canvas.height) {
      enemies.splice(i, 1);
    }
  }

  // 4. Move and manage point items
  for (let i = items.length - 1; i >= 0; i--) {
    items[i].y += items[i].speed;

    // Player collects an item
    if (checkCollision(player, items[i])) {
      score += 10;
      scoreVal.textContent = score;
      items.splice(i, 1);
      continue;
    }

    if (items[i].y > canvas.height) {
      items.splice(i, 1);
    }
  }
}

function renderGame() {
  // Clear the canvas window each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Point Collectibles
  items.forEach(item => {
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.size, item.size);
  });

  // Draw Enemy Blocks
  enemies.forEach(enemy => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  });

  // Draw Player Avatar
  ctx.fillStyle = player.color;
  ctx.shadowBlur = 15;
  ctx.shadowColor = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
  ctx.shadowBlur = 0; // Reset shadow effects for other elements
}

// Core loop handle synced with monitor frame update rate
function gameLoop() {
  if (isGameOver) return;

  updateGame();
  renderGame();

  animationFrameId = requestAnimationFrame(gameLoop);
}

function endGame() {
  isGameOver = true;
  cancelAnimationFrame(animationFrameId);
  finalScore.textContent = score;
  gameOverScreen.classList.remove('hidden');
}

function initGame() {
  score = 0;
  isGameOver = false;
  enemies = [];
  items = [];
  spawnTimer = 0;
  scoreVal.textContent = score;
  gameOverScreen.classList.add('hidden');
  
  // Re-establish tracking center default
  player.x = canvas.width / 2;
  player.y = canvas.height * 0.8;
  player.targetX = canvas.width / 2;
  player.targetY = canvas.height * 0.8;

  // Run loops
  cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(gameLoop);
}

restartBtn.addEventListener('click', initGame);

// Launch engine on entry
initGame();