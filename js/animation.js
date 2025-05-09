const canvas = document.getElementById('circuit-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Snake {
    constructor({ width, height, gridSize, directions, turnCooldownRange, lengthRange }) {
        this.gridSize = gridSize;
        this.directions = directions;
        this.turnCooldownRange = turnCooldownRange;
        this.lengthRange = lengthRange;

        const dir = this.randomChoice(this.directions);
        const startX = Math.random() > 0.5 ? 0 : width;
        const startY = Math.floor(Math.random() * height);

        this.x = Math.floor(startX / this.gridSize) * this.gridSize;
        this.y = Math.floor(startY / this.gridSize) * this.gridSize;
        this.dir = dir;
        this.path = [];
        this.length = this.randomInRange(this.lengthRange);
        this.step = 0;
        this.turnCooldown = this.randomInRange(this.turnCooldownRange);
        this.width = width;
        this.height = height;
    }

    randomInRange([min, max]) {
        return min + Math.floor(Math.random() * (max - min));
    }

    randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    update() {
        this.step++;

        if (this.step > this.turnCooldown) {
            this.step = 0;
            this.turnCooldown = this.randomInRange(this.turnCooldownRange);

            const validDirs = this.directions.filter(d =>
                !(d.x === -this.dir.x && d.y === -this.dir.y)
            );
            this.dir = this.randomChoice(validDirs);
        }

        this.x += this.dir.x * this.gridSize;
        this.y += this.dir.y * this.gridSize;

        this.x = (this.x + this.width) % this.width;
        this.y = (this.y + this.height) % this.height;

        this.path.push({ x: this.x, y: this.y });
        if (this.path.length > this.length) {
            this.path.shift();
        }
    }

    draw(ctx, style) {
        ctx.beginPath();
        ctx.strokeStyle = style.color;
        ctx.lineWidth = style.width;
        for (let i = 0; i < this.path.length - 1; i++) {
            ctx.moveTo(this.path[i].x, this.path[i].y);
            ctx.lineTo(this.path[i + 1].x, this.path[i + 1].y);
        }
        ctx.stroke();
    }
}

// Configuration object
const config = {
    gridSize: 20,
    snakeCount: 4,
    directions: [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ],
    turnCooldownRange: [20, 40],
    lengthRange: [10, 20],
    style: {
        color: '#704214',
        width: 1
    }
};

// Create snakes using the configuration
let snakes = [];

function createSnakes() {
    snakes = Array.from({ length: config.snakeCount }, () =>
        new Snake({
            width: canvas.width,
            height: canvas.height,
            gridSize: config.gridSize,
            directions: config.directions,
            turnCooldownRange: config.turnCooldownRange,
            lengthRange: config.lengthRange
        })
    );
}
createSnakes();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const snake of snakes) {
        snake.update();
        snake.draw(ctx, config.style);
    }

    requestAnimationFrame(draw);
}

draw();

