'use strict';

/**
 * Create an enemy.
 * @constructor
 * @param {number} x - The position of the enemy on the x axis.
 * @param {number} y - The position of the enemy on the y axis.
 * @param {number} speed - The speed of the enemy.
 */
function Enemy(x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

/**
 * Update the enemy position.
 * @param {number} dt - A time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
  // If the enemy goes off screen, reset his position and generate new speed.
  // That way, we can keep reusing the same 3 enemies, but with changing speeds.
  if (this.x > 500) {
    this.x = -100;
    this.speed = Math.random() * 300 + 200;
  }
  // Multiply any movement by delta to ensure consistent speed on all computers.
  this.x = this.x + this.speed * dt;
};

/** Draw the enemy on the screen. */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Create a player.
 * @constructor
 * @param {number} x - The position of the player on the x axis.
 * @param {number} y - The position of the player on the y axis.
 */
function Player(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
}

/**
 * Update the player position.
 * @param {string} moveDir - The direction in which to move the player.
 */
Player.prototype.update = function(moveDir) {
  const squareHeight = 82;
  const squareWidth = 101;
  switch (moveDir) {
    case 'up':
      this.y -= squareHeight;
      break;
    case 'down':
      this.y += squareHeight;
      break;
    case 'left':
      this.x -= squareWidth;
      break;
    case 'right':
      this.x += squareWidth;
  }
};

/** Draw the player on the screen. */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Move player according to the arrow key pressed on the keyboard.
 * @param {string} moveDir - The direction in which to move the player.
 */
Player.prototype.handleInput = function(moveDir) {
  // If the player is about to go off screen, prevent him from moving.
  if (this.y < 40 && moveDir == 'up') { return }
  if (this.y > 320 && moveDir == 'down') { return }
  if (this.x < 80 && moveDir == 'left') { return }
  if (this.x > 400 && moveDir == 'right') { return }

  // Else, move player.
  this.update(moveDir);
};

/**
 * Generate varied enemies.
 * @param {number} lane - The lane on which to position the enemy generated.
 */
function makeEnemy(lane) {
  // Place enemy on lane 1, 2, or 3
  let y = (lane == 1) ? 60 : (lane == 2) ? 145 : 230;
  let speed = Math.random() * 300 + 200;
  // Instantiate enemy off screen to the left to let him walk into the canvas.
  let enemy = new Enemy(-100, y, speed);
  return enemy
}

// Instantiate enemies and add them to array.
const allEnemies = [];
allEnemies.push(makeEnemy(1));
allEnemies.push(makeEnemy(2));
allEnemies.push(makeEnemy(3));

// Instantiate player
const player = new Player(200, 400);

// Listen for keypresses and pass direction to handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
