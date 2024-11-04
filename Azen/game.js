const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const spriteSheet = new Image();
spriteSheet.src = 'sprites.png';

const player = {
    x: 100,
    y: 100,
    width: 32,
    height: 32,
    frameX: 0,
    frameY: 0,
    speed: 5,
    moving: false,
    health: 100,
};

const enemy = {
    x: 300,
    y: 300,
    width: 32,
    height: 32,
    frameX: 0,
    frameY: 1,
    speed: 1,
    moving: true,
};

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function detectCollision(player, enemy) {
    return player.x < enemy.x + enemy.width &&
           player.x + player.width > enemy.x &&
           player.y < enemy.y + enemy.height &&
           player.y + player.height > enemy.y;
}

function moveEnemy() {
    if (enemy.x < player.x) enemy.x += enemy.speed;
    if (enemy.x > player.x) enemy.x -= enemy.speed;
    if (enemy.y < player.y) enemy.y += enemy.speed;
    if (enemy.y > player.y) enemy.y -= enemy.speed;
}

function update() {
    if (player.moving) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveEnemy();
        if (detectCollision(player, enemy)) {
            player.health -= 1; // Reduce health on collision
            console.log("Player health: " + player.health);
        }
        drawSprite(spriteSheet, player.frameX * player.width, player.frameY * player.height, player.width, player.height, player.x, player.y, player.width, player.height);
        drawSprite(spriteSheet, enemy.frameX * enemy.width, enemy.frameY * enemy.height, enemy.width, enemy.height, enemy.x, enemy.y, enemy.width, enemy.height);
    }
    requestAnimationFrame(update);
}

window.addEventListener('keydown', function(e) {
    player.moving = true;
    switch (e.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            player.frameY = 3;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            player.frameY = 0;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            player.frameY = 1;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            player.frameY = 2;
            break;
    }
});

window.addEventListener('keyup', function(e) {
    player.moving = false;
});

spriteSheet.onload = function() {
    update();
};
