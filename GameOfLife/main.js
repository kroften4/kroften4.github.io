function copy2d(array) {
    return array.map(e => e.slice());
}

function updatedState(oldState) {
    let newState = copy2d(oldState);
    let cells = document.querySelectorAll("[type=checkbox]");
    for (let cell of Array.from(cells)) {
        let x = cell["data-x"], y = cell["data-y"];
        newState[y][x] = cell.checked;
    }
    return newState;
}

function nextGen(oldState) {
    let newState = copy2d(oldState);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let neighbours = [];
            for (let offsetY of [-1, 0, 1]) {
                for (let offsetX of [-1, 0, 1]) {
                    if (offsetY == 0 && offsetX == 0) continue;
                    let neighX = x + offsetX, neighY = y + offsetY;
                    if (0 <= neighX && neighX < width &&
                        0 <= neighY && neighY < height) {
                        neighbours.push(state[neighY][neighX]);
                    }
                }
            }
            let alive = neighbours.filter(n => n).length;
            let dead = neighbours.length - alive;
            if (oldState[y][x] && (alive < 2 || alive > 3)) {
                newState[y][x] = false;
            }
            if (!oldState[y][x] && alive == 3) {
                newState[y][x] = true;
            }
        }
    }
    return newState;
}

function reset(oldState) {
    let newState = copy2d(oldState);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            newState[y][x] = false;
        }
    }
    return newState;
}

function randomize(oldState) {
    let newState = copy2d(oldState);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            newState[y][x] = Boolean(Math.floor(Math.random() * 2));
        }
    }
    return newState;
}

function updateGrid(state) {
    let cells = document.querySelectorAll("[type=checkbox]");
    for (let cell of Array.from(cells)) {
        let x = cell["data-x"], y = cell["data-y"];
        cell.checked = state[y][x];
    }
}

let grid = document.querySelector("#grid");
let width = 25, height = 25;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        let cell = document.createElement("input");
        cell.type = "checkbox";
        cell["data-x"] = x;
        cell["data-y"] = y;
        cell.checked = Boolean(Math.floor(Math.random() * 2));
        grid.appendChild(cell);
    }
    grid.appendChild(document.createElement("br"));
}

function nextStep() {
    state = updatedState(state);
    state = nextGen(state);
    updateGrid(state);
}

let state = [];
for (let i = 0; i < height; i++) {
    state.push([]);
}
state = updatedState(state);

let nextGenBtn = document.querySelector("#next");
nextGenBtn.addEventListener("click", () => {
    nextStep();
});
let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => {
    state = reset(state);
    updateGrid(state);
});
let randomizeBtn = document.querySelector("#randomize");
randomizeBtn.addEventListener("click", () => {
    state = randomize(state);
    updateGrid(state);
});
let animationInterval;
let isPlaying = false;
let startAnimationBtn = document.querySelector("#start");
startAnimationBtn.addEventListener("click", () => {
    if (!isPlaying) {
        isPlaying = true;
        nextStep();
        animationInterval = setInterval(() => {
            nextStep();
        }, 250);
    }
});
let stopAnimationBtn = document.querySelector("#stop");
stopAnimationBtn.addEventListener("click", () => {
    clearInterval(animationInterval);
    isPlaying = false;
});
