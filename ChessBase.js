const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;



const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '','', '','', '','', '',
    '', '','', '','', '','', '',
    '', '','', '','', '','', '',
    '', '','', '','', '','', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.setAttribute('square-id', i)

        //Add colors for the squares corresponding with their ID number
        const row = Math.floor((63- i)/8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown');
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige');
        }
        //If the space is not empty, allow the piece on the square to be draggable
        if (startPiece !== '') {
            const piece = document.createElement('div')
            piece.innerHTML = startPiece;

            //Add black pieces to the first 15 squares
            if (i <= 15) {
                square.innerHTML.classList.add('black');
            }
            //Add white pieces to the last 15 squares
            if (i >= 48) {
                square.innerHTML.classList.add('white');
            }

            square.appendChild(piece);
            square.setAttribute('draggable', true);

        }
        gameBoard.append(square);
    });
}
createBoard()

let startPositionId
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.closest.getAttribute('square-id');
    draggedElement = e.target;
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    const targetSquare = e.target.closest('.square');
    const endPositionId = targetSquare.getAttribute('square-id');

    if (targetSquare.innerHTML === '') {
        //Move the dragged piece to the targeted square
        targetSquare.innerHTML = draggedElement.innerHTML;
        draggedElement.innerHTML = ''; //Clear the starting square
    } else {
        targetSquare.innerHTML = draggedElement.innerHTML;

    }


}

const allSquares= document.querySelectorAll("#gameboard .square");

allSquares.forEach((square) => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('drop', dragDrop);
    square.addEventListener('dragover', dragOver);
});



