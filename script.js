
let HEIGHT = 700;
let WIDTH = 500;

let fonctionEnCours = annimation;
let FPS = 1000 / 60;

let taillePiece = WIDTH / 7;
let largeurColonne = WIDTH / 7;

let fondGrille = new Image();
fondGrille.src = "assets/img/grille.png";
let imagePieceRed = new Image();
imagePieceRed.src = "assets/img/pieceRed.png";
let imagePieceYellow = new Image();
imagePieceYellow.src = "assets/img/pieceYellow.png";
let imageFlecheVersLeBas = new Image();
imageFlecheVersLeBas.src = "assets/img/fleche_vers_le_vas.png";

let board;
let possitionMouseX;
let possitionMouseY;

let possitionGrilleY = 200;
let possitionGrilleX = 0;

let coloneSelectionner = 0;


let plateau = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

let pieceMouvement = {
    x: 0,
    y: 0,
    width: taillePiece,
    height: taillePiece,
}

let possitionFleche = {
    x: 0,
    newPosX: 0,
    y: 100,
    newPosY: 100,
    width: taillePiece,
    height: taillePiece,
    ease: "power1.inOut"

}


window.onload = function () {
    board = document.getElementById("board")
    board.height = HEIGHT;
    board.width = WIDTH;
    context = board.getContext("2d");

    document.addEventListener("mousemove", moveMouse);
    document.addEventListener("click", clickMouse);

    setInterval(() => fonctionEnCours(), FPS);
}


function annimation() {
    context.clearRect(0, 0, WIDTH, HEIGHT);

    context.drawImage(fondGrille, possitionGrilleX, possitionGrilleY, WIDTH-possitionGrilleX, HEIGHT-possitionGrilleY);

    context.drawImage(imageFlecheVersLeBas, possitionFleche.x, possitionFleche.y, possitionFleche.width, possitionFleche.height);

    context.drawImage(imagePieceRed, pieceMouvement.x, pieceMouvement.y, pieceMouvement.width, pieceMouvement.height);
}




function moveMouse(event) {
    possitionMouseX = event.pageX - (board.clientLeft + board.offsetLeft);
    possitionMouseY = event.pageY - (board.clientTop + board.offsetTop);
    
    if ( (0 <= possitionMouseX && possitionMouseX < WIDTH) && (possitionGrilleY <= possitionMouseY && possitionMouseY <= HEIGHT)) {
        possitionFleche.newPosX = Math.floor(possitionMouseX / largeurColonne) * largeurColonne;
        coloneSelectionner = possitionFleche.newPosX / largeurColonne;
        annim(possitionFleche);
    }
}

function clickMouse() {
    console.log("clickMouse dans la colone" + coloneSelectionner);
}

function annim(pieceMouvement) {
    gsap.to(pieceMouvement, { x: pieceMouvement.newPosX, y: pieceMouvement.newPosY, duration: 0.5, ease: pieceMouvement.ease})
}