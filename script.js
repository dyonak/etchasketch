const GRIDSIZE = 960;
const MINBLOCK = 10;

let rainbowPainting = false;
let shadedPainting = false;

let currentColorIndex = 0;
let blockSize = 32;

gridContainer = document.querySelector('.etchasketchbox');
sizeSlider = document.querySelector('.slider');

rainbowToggle = document.querySelector('.rainbowToggle');
shadedToggle = document.querySelector('.shadedToggle');

rainbowToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        rainbowPainting = true;
        shadedPainting = false;
        shadedToggle.checked = false;
    } else {
        rainbowPainting = false;
    }
    clearBlocks();
    fillBlocks();
});

shadedToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        shadedPainting = true;
        rainbowPainting = false;
        rainbowToggle.checked = false;
    } else {
        shadedPainting = false;
    }
    clearBlocks();
    fillBlocks();
});

sizeSlider.addEventListener('mouseup', (e) => {

    clearBlocks();
    console.log(`Checking ${e.target.value} and ${GRIDSIZE}`);
    
    blockSize = e.target.value;

    while (GRIDSIZE % blockSize) {
        blockSize++;
    }

    blockSize < MINBLOCK ? blockSize = MINBLOCK : blockSize = blockSize;

    console.log(`Set block size to ${blockSize}`);
    e.target.value = blockSize;
    fillBlocks();
});

let numColors = 100;

function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

function determineColorToPaint(e){
    if (rainbowPainting) {
        if (currentColorIndex >= numColors) {
            currentColorIndex = 0;
        }
        let color = rainbow(numColors, currentColorIndex);
        currentColorIndex++;
        return color;
    }
    if (shadedPainting) {
        currentShade = e.target.style.backgroundColor;
        console.log(currentShade);
        let colorNum = currentShade.slice(4,7);
        colorNum = colorNum.replace(',','');
        console.log(colorNum);
        colorNum = parseInt(colorNum)
        console.log(colorNum);
        
        if (colorNum >= 20){
            return(`rgb(${colorNum-20}, ${colorNum-20}, ${colorNum-20})`)
        };
        if (colorNum <= 20){
            return('rgb(0, 0, 0)')
        }
        return "rgb(220, 220, 220)";
    }
    return "rgb(180, 180, 180)";
}

function clearBlocks() {
    blockRows = document.querySelectorAll('.blockRow');
    blockRows.forEach(element => {
        element.remove();
    });
}

function fillBlockRow(blockRow, i) {
    while (i) {
        let block = document.createElement('div');
        block.className = 'block';
        block.style.width = blockSize + 'px';
        block.style.height = blockSize + 'px';
        block.addEventListener('mouseover', function(e) {
            e.target.style.backgroundColor = determineColorToPaint(e);
        });
        blockRow.appendChild(block);
        i--;
    };
};

function fillBlocks() {
    while (document.querySelectorAll(".blockRow").length < GRIDSIZE / blockSize){
        blockRow = document.createElement('div');
        blockRow.className = 'blockRow';
        gridContainer.appendChild(blockRow);
        fillBlockRow(blockRow, GRIDSIZE / blockSize);
        
    };
};

fillBlocks();