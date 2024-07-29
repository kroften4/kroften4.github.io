class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
    equals(other) {
        if (this.x == other.x && this.y == other.y)
            return true;
    }
}

class State {
    constructor(snake, apple, status) {
        this.snake = snake;
        this.apple = apple;
        this.status = status;
    }
    
    update(keys) {
        let newSnake = this.snake.update(keys);
        let newApple = this.apple.apple;
        if (this.apple.exists && this.apple.isEaten(newSnake)) {
            newSnake = newSnake.extend();
            newApple = Apple.spawn(newSnake.tail);
        }
        let status = Snake.checkState(newSnake.tail);
        if (this.status == "winning")
            status = "won";
        if (status == "lost" || this.status == "won") {
            this.status = status;
            return this;
        }
        return new State(newSnake, newApple, status);
    }

    static create() {
        let snake = Snake.create();
        let apple = Apple.spawn(snake.tail);
        let status = "playing";
        return new State(snake, apple, status);
    }
}

class Snake {
    constructor(tail, currDirection, prevEndPos) {
        this.tail = tail;
        this.#currDirection = currDirection;
        this.prevEndPos = prevEndPos;
    }

    #directions = {
        "ArrowUp": new Vec(0, -1),
        "ArrowDown": new Vec(0, 1),
        "ArrowRight": new Vec(1, 0),
        "ArrowLeft": new Vec(-1, 0)
    }

    #currDirection;

    get directions() {
        return this.#directions;
    }

    move(key) {
        let newTail = this.tail.slice();
        let prevEndPos = newTail.pop();
        let newPos = newTail[0].plus(this.#directions[key])
        // newPos.x = (fieldSize.x + newPos.x) % fieldSize.x;
        // newPos.y = (fieldSize.y + newPos.y) % fieldSize.y;
        newTail.unshift(newPos);
        return new Snake(newTail, key, prevEndPos);
    }

    static checkState(tail) {
        if (tail.length === fieldSize.x * fieldSize.y)
            return "winning";
        let headPos = tail[0];
        if (headPos.x < 0 || headPos.x >= fieldSize.x || 
            headPos.y < 0 || headPos.y >= fieldSize.y)
            return "lost";
        for (let partPos of tail.slice(1)) {
            if (tail[0].equals(partPos))
                return "lost";
        }
        return "playing";
    }

    update(recentKeys) {
        let nextDirection = this.#currDirection;
        let amount = 0;
        for (let key of recentKeys.keys) {
            amount += 1;
            if (key == this.#currDirection)
                continue;
            let newPos = this.tail[0].plus(this.#directions[key])
            let prevPos = this.tail[1]
            if (!newPos.equals(prevPos)) {
                nextDirection = key;
                break;
            }
        }
        recentKeys.keys = recentKeys.keys.slice(amount);
        return this.move(nextDirection);
    }

    extend() {
        let newTail = this.tail.slice();
        newTail.push(this.prevEndPos);
        return new Snake(newTail, this.#currDirection);
    }

    static create() {
        let x = Math.floor(fieldSize.x / 2);
        let y = Math.floor(fieldSize.y / 2);
        let pos = new Vec(x, y);
        const initialLength = 3;
        let tail = [];
        for (let i = 0; i < initialLength; i++) {
            let tile = new Vec(pos.x + i, pos.y)
            tail.push(tile);
        }
        return new Snake(tail, "ArrowLeft");
    }
}

class Apple {
    constructor(pos, exists) {
        this.pos = pos;
        this.exists = exists;
    }

    static spawn(tail) {
        let spawningSpace = [];
        for (let x = 0; x < fieldSize.x; x++) {
            for (let y = 0; y < fieldSize.y; y++) {
                let tile = new Vec(x, y);
                if (!tail.some(partPos => partPos.equals(tile)))
                    spawningSpace.push(tile);
            }
        }
        if (spawningSpace.length != 0) {
            let randomTileIndex = Math.floor(Math.random() * spawningSpace.length);
            return new Apple(spawningSpace[randomTileIndex], true);
        }
        return new Apple(null, false);
    }

    isEaten(snake) {
        if (snake.tail[0].equals(this.pos))
            return true;
        return false;
    }

    get apple() {
        return new Apple(this.pos, true);
    }
}

function trackRecentKeys(keys) {
    let recent = Object.create(null);
    recent.keys = []
    function track(event) {
        if (keys.includes(event.key)) {
            if (event.key != recent.keys.slice(-1) && recent.keys.length < 3)
                recent.keys.push(event.key);
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    return recent;
}

function drawField() {
    cx.clearRect(0, 0, canvas.width, canvas.height);
    cx.fillStyle = "LightGreen";
    cx.fillRect(0, 0, fieldSize.x * scale, fieldSize.y * scale);
}

function drawSnake(snake) {
    let tail = snake.tail;
    cx.fillStyle = "Green";
    let headPos = tail[0];
    cx.fillRect(headPos.x * scale, headPos.y * scale, scale, scale);
    cx.fillStyle = "Black";
    cx.fillRect(headPos.x * scale + scale / 2 - 1.5, headPos.y * scale + scale / 2 - 1.5, 3, 3);
    cx.fillStyle = "Green";
    for (let tailPart of tail.slice(1)) {
        cx.fillRect(tailPart.x * scale, tailPart.y * scale, scale, scale);
    }
}

function drawApple(apple) {
    cx.fillStyle = "red";
    cx.beginPath();
    cx.arc(apple.pos.x * scale + scale * 0.4625, apple.pos.y * scale + scale * 0.4625, scale * 0.4625, 0, 7);
    cx.shadowColor = "Black";
    cx.shadowOffsetX = scale * 0.075;
    cx.shadowOffsetY = scale * 0.075;
    cx.fill();
    cx.shadowOffsetX = 0;
    cx.shadowOffsetY = 0;
}

function drawState(state) {
    if (state.status == "playing" || state.status == "winning") {
        let snake = state.snake;
        let apple = state.apple;
        drawField();
        if (apple.exists)
            drawApple(apple);
        drawSnake(snake);
        return;
    }
    let message = "";
    if (state.status == "lost") {
        message = "GAME OVER";
        cx.fillStyle = "DarkRed";
    } else if (state.status == "won") {
        message = "VICTORY";
        cx.fillStyle = "SteelBlue";
    }
    cx.textAlign = "center";
    cx.textBaseline = "middle"
    cx.font = `normal ${scale * 1.5}px Arial`;
    cx.fillText(message, fieldSize.x * scale / 2, fieldSize.y * scale / 2);
}

const recentArrowKeys = trackRecentKeys(["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]);
let fieldSize = new Vec(15, 15);
let canvas = document.querySelector("canvas")
let cx = canvas.getContext("2d");
let scale = 20;
let state = State.create();
drawState(state);
cx.textAlign = "center";
cx.fillStyle = "black";
cx.font = `bold 14px Arial`;
cx.fillText("Press any key to start", fieldSize.x * scale * 0.5, fieldSize.y * scale * 0.7);
window.addEventListener("keydown", function startGame(event) {
    this.window.removeEventListener("keydown", startGame);
    runGame();
    event.preventDefault();
});

function runGame() {
    let interval = setInterval(() => {
        let ended = false;
        requestAnimationFrame((timestamp) => {
            state = state.update(recentArrowKeys);
            drawState(state);
            if (state.status == "won" || state.status == "lost") {
                clearInterval(interval);
            }
        })        
    }, 150)
}

