//global variables
const container = document.querySelector('.container');
const divs = document.querySelector('div');
const resetBtn = document.querySelector('#resetBtn');
const toggleBtn = document.querySelector('#toggleBtn');

//run at start to create the grid
function createGrid(num) {
    if (num === undefined) {
        num = 32;
    }
    const width = 720 / num;
    const squared = num * num;
    for (let i = 0; i < squared; i++) {
        const cell = document.createElement('div');
        cell.style.width = `${width}px`;
        cell.style.height = `${width}px`;
        cell.classList.add('myBox');
        container.append(cell);
        toggleBtn.addEventListener('click', function () { //grid lines button
            cell.classList.toggle('Border');
        });
        resetBtn.addEventListener('click', () => { //reset button
            cell.style.backgroundColor = '#EEE';
        });
    }
}

//clearGrid only runs before replaceGrid
function clearGrid() {
    let div = document.getElementById('box');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
//fires after the grid density slider
function replaceGrid(num) {
    const newNum = num;
    clearGrid();
    createGrid(newNum);
}

//accepts colors from buttons and slider
function paint(color) {
    if (color === undefined || color === 'black') {
        divs.addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = 'black';
        });
    } else if (color === 'rainbow') {
        divs.addEventListener('mouseover', function (e) {
            const rgb = "#" + Math.random().toString(16).slice(2, 8);
            e.target.style.backgroundColor = rgb;
        });
    } else if (color === 'eraser') {
        divs.addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = '#EEEEEE';
        });
    } else {
        divs.addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = color;
        });
    }
}
//color picker
const colorPicker = document.querySelector('#colorpicker');
colorPicker.addEventListener('input', () => paint(colorPicker.value));
//slider
const slider = document.querySelector("#myRange");
slider.addEventListener('input', () => replaceGrid(slider.value));
//black button
const blackBtn = document.querySelector('#blackBtn');
blackBtn.addEventListener('click', () => paint('black'));
//rainbow button
const rainbowBtn = document.querySelector('#rainbowBtn');
rainbowBtn.addEventListener('click', () => paint('rainbow'));
//eraser button
const eraserBtn = document.querySelector('#eraserBtn');
eraserBtn.addEventListener('click', () => paint('eraser'));

//main two functions that run at start
createGrid();
paint();

//outputs purely text to display grid density
const output = document.querySelector("#demo");
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerText = this.value;
}