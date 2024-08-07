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

function generateGrid(grid, width, height) {
    grid.innerHTML = "";
    for (let y = 0; y < height; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < width; x++) {
            let cell = document.createElement("input");
            cell.type = "checkbox";
            cell["data-x"] = x;
            cell["data-y"] = y;
            cell.checked = Boolean(Math.floor(Math.random() * 2));
            let tableCell = document.createElement("td");
            row.appendChild(tableCell).appendChild(cell);
        }
        grid.appendChild(row)
    }
}

function initialize() {
    width = document.querySelector("#width").value;
    height = document.querySelector("#height").value;
    generateGrid(grid, width, height);

    state = [];
    for (let i = 0; i < height; i++) {
        state.push([]);
    }
    state = updatedState(state);
}

let grid = document.querySelector("#grid");
let interval = document.querySelector("#interval").value;
let width, height, state;
initialize();

function nextStep() {
    state = updatedState(state);
    state = nextGen(state);
    updateGrid(state);
}

let nextGenBtn = document.querySelector("#next");
nextGenBtn.addEventListener("click", nextStep);
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

function playAnimation() {
    if (!isPlaying) {
        isPlaying = true;
        nextStep();
        animationInterval = setInterval(() => {
            nextStep();
        }, interval * 1000);
    }
}

function stopAnimation() {
    clearInterval(animationInterval);
    isPlaying = false;
}

let animationInterval;
let isPlaying = false;
let startAnimationBtn = document.querySelector("#start");

startAnimationBtn.addEventListener("click", playAnimation);

let stopAnimationBtn = document.querySelector("#stop");
stopAnimationBtn.addEventListener("click", stopAnimation);

let changeSizeBtn = document.querySelector("#change-size");
changeSizeBtn.addEventListener("click", initialize);

let intervalInput = document.querySelector("#interval");
intervalInput.addEventListener("change", () => {
    console.log(intervalInput.value, interval);
    interval = intervalInput.value;
    if (isPlaying) {
        stopAnimation();
        playAnimation();
    }
});

const gliderPattern = 
`..X
X.X
.XX`;

const piHeptominoPattern = 
`XXX
X.X
X.X`;

const copperheadPattern = 
`.XX..XX.
...XX...
...XX...
X.X..X.X
X......X
........
X......X
.XX..XX.
..XXXX..
........
...XX...
...XX...`;

const loneDotAgarPattern = 
`......XX..XX......
......X..X.X......
.......X..........
...XX.....X..XX...
...X..X.X...X.X...
....X.....X.......
XX.....X.....X..XX
X..X.X...X.X...X.X
.X.....X.....X....
....X.....X.....X.
X.X...X.X...X.X..X
XX..X.....X.....XX
.......X.....X....
...X.X...X.X..X...
...XX..X.....XX...
..........X.......
......X.X..X......
......XX..XX......`;

const pufferfishPattern = 
`...X.......X...
..XXX.....XXX..
.XX..X...X..XX.
...XXX...XXX...
...............
....X.....X....
..X..X...X..X..
X.....X.X.....X
XX....X.X....XX
......X.X......
...X.X...X.X...
....X.....X....`;

const gosperGliderGunPattern = 
`........................X...........
......................X.X...........
............XX......XX............XX
...........X...X....XX............XX
XX........X.....X...XX..............
XX........X...X.XX....X.X...........
..........X.....X.......X...........
...........X...X....................
............XX......................`;

const presets = {
    "glider": {
        pattern: gliderPattern, 
        offset: {x: 1, y: 1},
        gridSize: {x: 40, y: 40}
    },
    "piHeptomino": {
        pattern: piHeptominoPattern, 
        offset: {x: 23, y: 23},
        gridSize: {x: 50, y: 50}
    },
    "copperhead": {
        pattern: copperheadPattern, 
        offset: {x: 4, y: 86},
        gridSize: {x: 16, y: 100}
    },
    "loneDotAgar": {
        pattern: loneDotAgarPattern, 
        offset: {x: 3, y: 3},
        gridSize: {x: 24, y: 24}
    },
    "pufferfish": {
        pattern: pufferfishPattern, 
        offset: {x: 3, y: 85},
        gridSize: {x: 21, y: 100}
    },
    "gosperGliderGun": {
        pattern: gosperGliderGunPattern, 
        offset: {x: 1, y: 1},
        gridSize: {x: 65, y: 50}
    }
}

function extendPresets() {
    for (let prop in presets) {
        let preset = presets[prop];
        preset.pattern = preset.pattern.split('\n')
        preset.size = {
            x: preset.pattern[0].length, 
            y: preset.pattern.length
        };
        const emptyRow = '.'.repeat(preset.gridSize.x) + '\n';
        let fullPattern = emptyRow.repeat(preset.offset.y);
        for (let patternPart of preset.pattern) {
            let leftPart = '.'.repeat(preset.offset.x);
            let rightPart = '.'.repeat(preset.gridSize.x - preset.size.x - preset.offset.x) + '\n';
            let row = leftPart + patternPart + rightPart;
            fullPattern += row;
        }
        let rest = preset.gridSize.y - preset.offset.y - preset.size.y;
        fullPattern += emptyRow.repeat(rest);
        preset.fullPattern = fullPattern;
    }
}
extendPresets();

function generateGridFromState(state) {
    grid.innerHTML = "";
    for (let y = 0; y < height; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < width; x++) {
            let cell = document.createElement("input");
            cell.type = "checkbox";
            cell["data-x"] = x;
            cell["data-y"] = y;
            cell.checked = state[y][x];
            let tableCell = document.createElement("td");
            row.appendChild(tableCell).appendChild(cell);
        }
        grid.appendChild(row)
    }
}

function generateStateFromPreset(preset) {
    let pattern = preset.fullPattern.split('\n').map(row => row.split(""));
    let newState = [];
    height = pattern.length;
    width = pattern[0].length;
    for (let y = 0; y < height; y++) {
        newState[y] = [];
        for (let x = 0; x < width; x++) {
            newState[y][x] = pattern[y][x] == 'X' ? true : false;
        }
    }
    return newState;
}

const presetsSelect = document.querySelector("#presets");
const generatePresetBtn = document.querySelector("#preset-btn");
generatePresetBtn.addEventListener("click", () => {
    let selectedOption = presetsSelect.options[presetsSelect.selectedIndex];
    let selectedPreset = presets[selectedOption.value];
    state = generateStateFromPreset(selectedPreset);
    generateGridFromState(state);
})
