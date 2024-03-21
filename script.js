

import { affichePiece } from './src/affichage.js';
import { constante, variable } from './src/variable.js';
import { moveMouse, clickMouse, upMouse } from './src/eventListener.js';



const button = document.getElementById("btnStartGame");




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

    let idBlockJeu = document.getElementById("idBlockJeu");
    idBlockJeu.style.width = constante.WIDTH + "px";
    
    initGame();
    setInterval(() => variable.fonctionEnCours(), constante.FPS);
}


function initGame() {
    variable.fonctionEnCours = main;
    variable.finGame = false;
    variable.plateau = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ];
    variable.nbTour = 0;
    changeTextHTML(variable.textNbTour, "Tour: " + variable.nbTour);
    variable.joueurActuel = 0;
    changeTextHTML(textJoueur, `Joueur: Red `);
    variable.coloneSelectionner = 0;
    constante.pieceEnCoursMouvement = false;
    if (constante.annimationGSAP != null) {
        if (constante.annimationGSAP.isActive()) {
            constante.annimationGSAP.kill();
        }
    }

    gsap.to(".imageFleche", { opacity: 1, duration: 0.5 });
}


function main() {
    variable.context.fillStyle = "white";
    variable.context.fillRect(0, 0, constante.WIDTH, constante.HEIGHT);    
    affichePiece();
    //affiche piece en mouvement:
    if (constante.pieceEnCoursMouvement) {
        variable.context.drawImage(constante.listeJoueur[variable.joueurActuel], variable.pieceMouvement.x, variable.pieceMouvement.y, constante.largeurGrilleX, constante.largeurGrilleY);
    }
    variable.context.drawImage(constante.fondGrille, 0, 0, constante.WIDTH, constante.HEIGHT);
}


function changeTextHTML(baliseHTML, text) {
    baliseHTML.innerHTML = text;
}

button.addEventListener("click", () => {
    gsap.to("#board", {
        opacity: 0, duration: 0.5,
        onComplete: () => {
            initGame();
            gsap.to("#board", { opacity: 1, duration: 0.5 });
        }
    })
});
  