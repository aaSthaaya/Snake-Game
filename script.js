const gameBoard = document.getElementById('gameBoard');
const gridSize = 20; // Size of each grid cell
const boardSize = 20; // Number of cells in each row and column

// Initialize the game
let snake = [{x: 10, y: 10}]; // Starting position of the snake
let direction = {x: 0, y: 0}; // Initial movement direction
let food = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)}; // Random initial position of food

// Main game loop
function main() {
  moveSnake();
  drawGame();
  checkCollision();
}

// Move the snake
function moveSnake() {
  const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    // If the snake eats the food, generate new food
    food = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)};
  } else {
    snake.pop(); // Remove the tail if the snake doesn't eat food
  }
}

// Draw the game on the board
function drawGame() {
  gameBoard.innerHTML = ''; // Clear the board
  // Draw snake
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
  // Draw food
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

// Check for collision with walls or itself
function checkCollision() {
  if (
    snake[0].x < 1 || snake[0].x > boardSize ||
    snake[0].y < 1 || snake[0].y > boardSize ||
    snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    clearInterval(gameLoop); // Stop the game
    alert('Game Over!'); // Show game over message
  }
}

// Event listener for keyboard input
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y !== 1) direction = {x: 0, y: -1};
      break;
    case 'ArrowDown':
      if (direction.y !== -1) direction = {x: 0, y: 1};
      break;
    case 'ArrowLeft':
      if (direction.x !== 1) direction = {x: -1, y: 0};
      break;
    case 'ArrowRight':
      if (direction.x !== -1) direction = {x: 1, y: 0};
      break;
  }
});

// Start the game loop
const gameLoop = setInterval(main, 100);
