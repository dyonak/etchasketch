const GRIDSIZE = 960;
const RAINBOW = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

let currentColorIndex = 0;
let blockSize = 32;

gridContainer = document.querySelector('.etchasketchbox');
sizeSlider = document.querySelector('.slider');

sizeSlider.addEventListener('mouseup', (e) => {

    blockRows = document.querySelectorAll('.blockRow');
    blockRows.forEach(element => {
        element.remove();
    });

    console.log(`Checking ${e.target.value} and ${GRIDSIZE}`);
    
    blockSize = e.target.value;

    while (GRIDSIZE % blockSize) {
        blockSize++;
    }

    console.log(`Set block size to ${blockSize}`);
    e.target.value = blockSize;
    fillBlocks();
});

function fillBlockRow(blockRow, i) {
    while (i) {
        let block = document.createElement('div');
        block.className = 'block';
        block.style.width = blockSize + 'px';
        block.style.height = blockSize + 'px';
        block.addEventListener('mouseover', function(e) {
            if (currentColorIndex >= RAINBOW.length) {
                currentColorIndex = 0;
            }
            e.target.style.backgroundColor = RAINBOW[currentColorIndex];
            currentColorIndex++;
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