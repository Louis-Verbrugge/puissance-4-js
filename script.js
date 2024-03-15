

let textJoueur = document.getElementById("textJoueur");

let HEIGHT = 700;
let WIDTH = 500;

let fonctionEnCours = annimation;
let FPS = 1000 / 60;

let taillePiece = WIDTH / 7;

let largeurGrilleX = WIDTH / 7;
let largeurGrilleY = (HEIGHT-200) / 6;

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

let listeJoueur = [imagePieceRed, imagePieceYellow];
let joueurActuel = 0;

let plateau = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];

let pieceEnCoursMouvement = false;

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
    height: taillePiece
}

gsap.to(".imageFleche", { x: possitionFleche.taillePiece, y: possitionFleche.newPosY, duration: 0.7, ease: possitionFleche.ease })



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

    //partie haut de l'ecran: (score+ATH)
    context.fillStyle = "white ";
    context.fillRect(0, 0, WIDTH, possitionGrilleY);

    //partie bas de l'ecran: (grille de jeu)
    context.fillStyle = "black";
    context.fillRect(0, possitionGrilleY, WIDTH, HEIGHT);

    context.drawImage(imageFlecheVersLeBas, possitionFleche.x, possitionFleche.y, possitionFleche.width, possitionFleche.height);

    affichePiece();

    //affiche piece en mouvement:
    if (pieceEnCoursMouvement) {
        context.drawImage(listeJoueur[joueurActuel], pieceMouvement.x, pieceMouvement.y, largeurGrilleX, largeurGrilleY);
    }

    context.drawImage(fondGrille, possitionGrilleX, possitionGrilleY, WIDTH - possitionGrilleX, HEIGHT - possitionGrilleY);

}


function finGame() {
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
    
    pieceMouvement = {
        x: coloneSelectionner * largeurGrilleX,
        y: possitionGrilleY-taillePiece*2,
        newPosX: coloneSelectionner * largeurGrilleX,
        newPosY: possitionGrilleY + hauteurPiece * largeurGrilleY,
        ease: "bounce"
    }
    annimPiece(pieceMouvement);
    pieceEnCoursMouvement = true;
    
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
                context.drawImage(imagePieceRed, x * largeurGrilleX, y * largeurGrilleY + possitionGrilleY, largeurGrilleX, largeurGrilleY);
            } else if (colone === "yellow") {
                context.drawImage(imagePieceYellow, x * largeurGrilleX, y * largeurGrilleY + possitionGrilleY, largeurGrilleX, largeurGrilleY);
            }

        })
    })
}


function moveMouse(event) {
    possitionMouseX = event.pageX - (board.clientLeft + board.offsetLeft);
    possitionMouseY = event.pageY - (board.clientTop + board.offsetTop);

    if ((0 <= possitionMouseX && possitionMouseX < WIDTH) && (possitionGrilleY <= possitionMouseY && possitionMouseY <= HEIGHT)) {
        possitionFleche.newPosX = Math.floor(possitionMouseX / largeurGrilleX) * largeurGrilleX;
        coloneSelectionner = possitionFleche.newPosX / largeurGrilleX;
        annimFleche(possitionFleche);
    }
}

function clickMouse() {
    if (!pieceEnCoursMouvement) {
        console.log("clickMouse dans la colone" + coloneSelectionner);
        possitionPlusBas = piecePlusBas(coloneSelectionner);
    } else {   
        alert("attender que le mouvement de la piece se termine");
    }
}

function annimFleche(pieceMouvementt) {
    gsap.to(".imageFleche", { x: pieceMouvementt.newPosX, y: pieceMouvementt.newPosY, duration: 0.7, ease: pieceMouvementt.ease })

    gsap.to(pieceMouvementt, { x: pieceMouvementt.newPosX, y: pieceMouvementt.newPosY, duration: 0.7, ease: pieceMouvementt.ease })
}

function annimPiece(pieceMouvementtt) {
    gsap.fromTo(pieceMouvementtt, {
        x: pieceMouvementtt.x,
        y: pieceMouvementtt.y
    }, {
        x: pieceMouvementtt.newPosX,
        y: pieceMouvementtt.newPosY,
        duration: 1,
        ease: pieceMouvementtt.ease,
        onComplete: () => {
            if (joueurActuel == 0) {
                couleurAffichePiece = "red";
                joueurActuel = 1;
                modifCelluleHTML(textJoueur, "Joueur 2")
            } else {
                couleurAffichePiece = "yellow";
                joueurActuel = 0;
                modifCelluleHTML(textJoueur, "Joueur 1")
            }
            pieceEnCoursMouvement = false;
            plateau[Math.round((pieceMouvementtt.newPosY-possitionGrilleY) / largeurGrilleY)][Math.round(pieceMouvementtt.newPosX / largeurGrilleX)] = couleurAffichePiece;
        }
    })
}


function modifCelluleHTML(idBalise, texte) {
    idBalise.innerHTML = texte;
}