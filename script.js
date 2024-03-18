

import { affichePiece } from './src/affichage.js';
import { constante, variable } from './src/variable.js';
import { moveMouse, clickMouse, upMouse } from './src/eventListener.js';


let fonctionEnCours = main;



window.onload = function () {
    constante.board = document.getElementById("board")
    constante.board.style.WIDTH = constante.WIDTH + "px";
    constante.board.style.height  = constante.HEIGHT  + "px";
    constante.board.height  = constante.HEIGHT ;
    constante.board.width = constante.WIDTH;
    variable.context = constante.board.getContext("2d");
    document.addEventListener("mousemove", moveMouse);
    document.addEventListener("mousedown", clickMouse);
    document.addEventListener("mouseup", upMouse);
    variable.idImgFleche.style.width = constante.taillePiece + "px";
    variable.idImgFleche.style.height  = constante.taillePiece + "px"
    initGame();
    setInterval(() => fonctionEnCours(), constante.FPS);
}


function initGame() {
    variable.plateau = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ];
    constante.nbTour = 0;
    changeTextHTML(variable.textNbTour, "Tour: " + constante.nbTour);
    constante.joueurActuel = 0;
    changeTextHTML(variable.textJoueur, "Joueur: " + (constante.joueurActuel + 1));
    constante.coloneSelectionner = 0;
    constante.pieceEnCoursMouvement = false;
    if (constante.annimationGSAP != null) {
        if (constante.annimationGSAP.isActive()) {
            constante.annimationGSAP.kill();
        }
    }
}


function main() {
    variable.context.fillStyle = "black";
    variable.context.fillRect(0, 0, constante.WIDTH, constante.HEIGHT);    
    affichePiece();
    //affiche piece en mouvement:
    if (constante.pieceEnCoursMouvement) {
        variable.context.drawImage(constante.listeJoueur[constante.joueurActuel], variable.pieceMouvement.x, variable.pieceMouvement.y, constante.largeurGrilleX, constante.largeurGrilleY);
    }
    variable.context.drawImage(constante.fondGrille, 0, 0, constante.WIDTH, constante.HEIGHT);
}


function changeTextHTML(baliseHTML, text) {
    baliseHTML.innerHTML = text;
}

function resetGame() {
    gsap.to("#board", {
        opacity: 0, duration: 0.5,
        onComplete: () => {
            initGame();
            gsap.to("#board", { opacity: 1, duration: 0.5 });
        }
    })
}
