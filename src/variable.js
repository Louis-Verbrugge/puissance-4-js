
var WIDTH = 450;
var HEIGHT = 450;

var fondGrille = new Image();
fondGrille.src = "assets/img/grille.png";
var imagePieceRed = new Image();
imagePieceRed.src = "assets/img/pieceRed.png";
var imagePieceYellow = new Image();
imagePieceYellow.src = "assets/img/pieceYellow.png";


export const constante = {
    WIDTH: WIDTH,
    HEIGHT: HEIGHT,
    FPS: 1000 / 60,
    taillePiece: WIDTH / 7,
    largeurGrilleX: WIDTH / 7,
    largeurGrilleY: WIDTH / 6,
    fondGrille: fondGrille,
    imagePieceRed: imagePieceRed,
    imagePieceYellow: imagePieceYellow,
    largeurPlateau: 7, // pas forcement utile
    hauteurPlateau: 6,
    listeJoueur: [imagePieceRed, imagePieceYellow],
}


export let variable = {
    textNbTour: document.getElementById("textTour"),
    textJoueur: document.getElementById("textJoueur"),
    idImgFleche: document.getElementById("idImgFleche"),
    
    context: null,
    board: null,
    possitionMouseX: null,
    possitionMouseY: null,
    coloneSelectionner: null,
    joueurActuel: null,
    nbTour: 0,
    plateau: null,
    couleurAffichePiece: null,
    annimationGSAP: null,
    possitionPlusBas: null, // pas forcement utile
    pieceEnCoursMouvement: false,

    pieceMouvement: {
        x: 0,
        y: 0,
        newPosX: 0,
        newPosY: 0,
        ease: "bounce"
    },

    possitionFleche: {
        x: 0,
        newPosX: 0,
        y: 100,
        newPosY: 100,
        WIDTH: constante.taillePiece,
        HEIGHT : constante.taillePiece
    }


}