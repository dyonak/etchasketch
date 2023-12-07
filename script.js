const GRIDSIZE = 960;
let blockSize = 32;

gridContainer = document.querySelector('.etchasketchbox');

function fillBlockRow(blockRow, i) {
    while (i) {
        let block = document.createElement('div');
        block.className = 'block';
        block.style.width = blockSize + 'px';
        block.style.height = blockSize + 'px';
        block.addEventListener('mouseover', function(e) {
            e.target.style.backgroundColor = "darkgrey";
        });
        blockRow.appendChild(block);
        i--;
    };
};

while (document.querySelectorAll(".blockRow").length < GRIDSIZE / blockSize){
    blockRow = document.createElement('div');
    blockRow.className = 'blockRow';
    gridContainer.appendChild(blockRow);
    fillBlockRow(blockRow, GRIDSIZE / blockSize);
};