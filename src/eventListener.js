
import { constante, variable } from './variable.js';
import { annimPiece, annim } from './affichage.js';
import { piecePlusBas } from './fonctionCalcul.js';

function changerCurseur(newCurseur) {
    document.body.style.cursor = newCurseur;
}

export function moveMouse(event) {
    if (!variable.finGame) {
        variable.possitionMouseX = event.pageX - (constante.board.clientLeft + constante.board.offsetLeft);
        constante.possitionMouseY = event.pageY - (constante.board.clientTop + constante.board.offsetTop);
        if ((0 <= variable.possitionMouseX && variable.possitionMouseX < constante.WIDTH) && (0 <= constante.possitionMouseY && constante.possitionMouseY <= constante.HEIGHT )) {
            variable.possitionFleche.newPosX = Math.floor(variable.possitionMouseX / constante.largeurGrilleX) * constante.largeurGrilleX;
            variable.coloneSelectionner = variable.possitionFleche.newPosX / constante.largeurGrilleX;
            annim(variable.possitionFleche);
        }
    }
}


export function clickMouse() {  
    changerCurseur("grabbing");
}

export function upMouse() {
    changerCurseur("grab");
    if (!constante.pieceEnCoursMouvement && !variable.finGame) {
        if (0 <= variable.possitionMouseX && variable.possitionMouseX < constante.WIDTH &&
            0 <= constante.possitionMouseY && constante.possitionMouseY <= constante.HEIGHT ) {
            if (piecePlusBas()) {
                annimPiece(variable.pieceMouvement);
                constante.pieceEnCoursMouvement = true;
            }
        }
    }
}