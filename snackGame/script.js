const board = document.getElementById('game-board');
const scoreEl = document.getElementById('score');

const size = 20; // taille du board (20x20)
let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;

// Crée le board
function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < size*size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}

// Affiche le snake et la nourriture
function draw() {
    createBoard();
    const cells = board.children;
    snake.forEach(segment => {
        const index = segment.y * size + segment.x;
        cells[index].classList.add('snake');
    });
    const foodIndex = food.y * size + food.x;
    cells[foodIndex].classList.add('food');
}

// Déplace le snake
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Vérifie collision murs ou snake
    if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size || snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        clearInterval(gameInterval);
        alert('Game Over! Votre score : ' + score);
        return;
    }

    snake.unshift(head);

    // Mange la nourriture
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreEl.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    draw();
}

// Génère nourriture aléatoire
function generateFood() {
    food = {
        x: Math.floor(Math.random() * size),
        y: Math.floor(Math.random() * size)
    };
    if (snake.some(seg => seg.x === food.x && seg.y === food.y)) {
        generateFood();
    }
}

// Contrôle avec les touches
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
});

// Démarre le jeu
function startGame() {
    dx = 1;
    dy = 0;
    snake = [{x: 10, y: 10}];
    score = 0;
    scoreEl.textContent = score;
    generateFood();
    draw();
    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, 200);
}

startGame();
