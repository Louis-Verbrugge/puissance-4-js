

import { constante, variable } from "./variable.js";


export function piecePlusBas() {
    let hauteurPiece = constante.hauteurPlateau - 1;
    while (variable.plateau[hauteurPiece][constante.coloneSelectionner] != "" && hauteurPiece >= 0) {
        hauteurPiece--;
        if (hauteurPiece < 0) {
            return false;
        }
    }

    variable.pieceMouvement = {
        x: constante.coloneSelectionner * constante.largeurGrilleX,
        y: -constante.taillePiece * 2,
        newPosX: constante.coloneSelectionner * constante.largeurGrilleX,
        newPosY: hauteurPiece * constante.largeurGrilleY,
        ease: "bounce"
    }
    return true;
}