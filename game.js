import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

// requestAnimationFrame: See http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
function main(currentTime) {
  if (gameOver) {
    if (confirm('GAME OVER. Click OK to restart.')) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

// Update snake and food
function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

// After food and snake updated, render to screen
function draw() {
  // Clear all old elements before rendering new snake and food
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
