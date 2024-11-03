const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const spriteSheet = document.getElementById('spriteSheet');
const player = {
    x: 256,
    y: 240,
    width: 32,
    height: 32,
    spriteX: 0,
    spriteY: 0
};

const tileSize = 32;
const tileMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const tiles = {
    0: 'lightgrey', // Walkable path
    1: 'darkgrey'   // Wall
};

function drawTileMap() {
    for (let row = 0; row < tileMap.length; row++) {
        for (let col = 0; col < tileMap[row].length; col++) {
            const tile = tileMap[row][col];
            ctx.fillStyle = tiles[tile];
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

function drawSprite(img, imgX, imgY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight) {
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight);
}

function drawPlayer() {
    drawSprite(spriteSheet, player.spriteX, player.spriteY, player.width, player.height, player.x, player.y, player.width, player.height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updatePlayerPosition(direction) {
    const speed = 4;
    let newX = player.x;
    let newY = player.y;

    switch (direction) {
        case 'ArrowUp': newY -= speed; player.spriteY = -5; player.spriteX = 175; break; 
        case 'ArrowDown': newY += speed; player.spriteY = -5; player.spriteX = 115; break; 
        case 'ArrowLeft': newX -= speed; player.spriteY = -5; player.spriteX = 150; break; 
        case 'ArrowRight': newX += speed; player.spriteY = -5; player.spriteX = 200; break;
    }

    const col = Math.floor(newX / tileSize);
    const row = Math.floor(newY / tileSize);
    if (tileMap[row][col] === 0) {
        player.x = newX;
        player.y = newY;
    }
}

function gameLoop() {
    clearCanvas();
    drawTileMap();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': updatePlayerPosition('up'); break;
        case 'ArrowDown': updatePlayerPosition('down'); break;
        case 'ArrowLeft': updatePlayerPosition('left'); break;
        case 'ArrowRight': updatePlayerPosition('right'); break;
    }
});

gameLoop();
