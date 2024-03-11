
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

let largeurPlateau = 7;
let hauteurPlateau = 6;

let plateau = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];


let pieceMouvement = {
    x: 0,
    y: 0,
    newPosX: 0,
    newPosY: 0,
    ease: "bounce"
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

    context.drawImage(fondGrille, possitionGrilleX, possitionGrilleY, WIDTH - possitionGrilleX, HEIGHT - possitionGrilleY);

    context.drawImage(imageFlecheVersLeBas, possitionFleche.x, possitionFleche.y, possitionFleche.width, possitionFleche.height);

    context.drawImage(imagePieceRed, pieceMouvement.x, pieceMouvement.y, pieceMouvement.width, pieceMouvement.height);
    affichePiece();
}


function piecePlusBas(coloneSelectionner) {
    let hauteurPiece = hauteurPlateau - 1;
    while (plateau[hauteurPiece][coloneSelectionner] != "" && hauteurPiece >= 0) {
        hauteurPiece--;
        if (hauteurPiece < 0) {
            alert("colone pleine");
            return;
        }
    }
    plateau[hauteurPiece][coloneSelectionner] = "red";
    //modifierInfoGrille(hauteurPiece);
    //plateau[hauteurPiece][coloneSelectionner].newPosY = hauteurPiece * largeurColonne + possitionGrilleY;
    /*
    pieceMouvement = {
        x: coloneSelectionner * largeurColonne,
        y: -taillePiece,
        newPosX: coloneSelectionner * largeurColonne,
        newPosY: hauteurPiece * largeurColonne + possitionGrilleY,
        ease: "bounce"
    }
    annimPiece(pieceMouvement);
    */

}

function modifierInfoGrille(possitionPlusBas) {
    if (0 <= possitionPlusBas && possitionPlusBas < hauteurPlateau) {
        plateau[possitionPlusBas][coloneSelectionner] = "red";
    }
}

function affichePiece() {
    plateau.forEach((ligne, y) => {
        ligne.forEach((colone, x) => {

            if (colone === "red") {
                context.drawImage(imagePieceRed, x * largeurColonne, y * largeurColonne + possitionGrilleY, largeurColonne, largeurColonne);
            } else if (colone === "yellow") {
                context.drawImage(imagePieceYellow, x * largeurColonne, y * largeurColonne + possitionGrilleY, largeurColonne, largeurColonne);
            }

        })
    })
}


function moveMouse(event) {
    possitionMouseX = event.pageX - (board.clientLeft + board.offsetLeft);
    possitionMouseY = event.pageY - (board.clientTop + board.offsetTop);

    if ((0 <= possitionMouseX && possitionMouseX < WIDTH) && (possitionGrilleY <= possitionMouseY && possitionMouseY <= HEIGHT)) {
        possitionFleche.newPosX = Math.floor(possitionMouseX / largeurColonne) * largeurColonne;
        coloneSelectionner = possitionFleche.newPosX / largeurColonne;
        annim(possitionFleche);
    }
}

function clickMouse() {
    let possitionPlusBas;
    console.log("clickMouse dans la colone" + coloneSelectionner);
    possitionPlusBas = piecePlusBas(coloneSelectionner);

}

function annim(pieceMouvement) {
    gsap.to(pieceMouvement, { x: pieceMouvement.newPosX, y: pieceMouvement.newPosY, duration: 0.5, ease: pieceMouvement.ease })
}


function annimPiece(pieceMouvement) {
    gsap.fromTo(pieceMouvement, {
        x: pieceMouvement.x * taillePiece,
        y: 0
    }, {
        x: pieceMouvement.newPosX,
        y: pieceMouvement.newPosY,
        duration: 1,
        ease: pieceMouvement.ease,
    })
}
