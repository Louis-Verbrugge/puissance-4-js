

import { constante, variable } from "./variable.js";


export function piecePlusBas() {
    let hauteurPiece = constante.hauteurPlateau - 1;
    while (variable.plateau[hauteurPiece][variable.coloneSelectionner] != "" && hauteurPiece >= 0) {
        hauteurPiece--;
        if (hauteurPiece < 0) {
            return false;
        }
    }

    variable.pieceMouvement = {
        x: variable.coloneSelectionner * constante.largeurGrilleX,
        y: -constante.taillePiece * 2,
        newPosX: variable.coloneSelectionner * constante.largeurGrilleX,
        newPosY: hauteurPiece * constante.largeurGrilleY,
        ease: "bounce"
    }
    return true;
}

export function checkWin() {
    // check horizontal
    for (let i = 0; i < constante.hauteurPlateau; i++) {
        for (let j = 0; j < constante.largeurPlateau-3; j++) {
            if (variable.plateau[i][j] != "" && variable.plateau[i][j] == variable.plateau[i][j + 1] && variable.plateau[i][j] == variable.plateau[i][j + 2] && variable.plateau[i][j] == variable.plateau[i][j + 3]) {
                variable.gaganant = variable.plateau[i][j];
                return true;
            }
        }
    }

    // check vertical
    for (let i = 0; i < constante.largeurPlateau; i++) {
        for (let j = 0; j < constante.hauteurPlateau-3; j++) {
            if (variable.plateau[j][i] != "" && variable.plateau[j][i] == variable.plateau[j + 1][i] && variable.plateau[j][i] == variable.plateau[j + 2][i] && variable.plateau[j][i] == variable.plateau[j + 3][i]) {
                variable.gaganant = variable.plateau[j][i];
                return true;
            }
        }
    }
    // check diagonal
    for (let i = 0; i < constante.largeurPlateau-3; i++) {
        for (let j = 0; j < constante.hauteurPlateau-3; j++) {
            if (variable.plateau[j][i] != "" && variable.plateau[j][i] == variable.plateau[j + 1][i + 1] && variable.plateau[j][i] == variable.plateau[j + 2][i + 2] && variable.plateau[j][i] == variable.plateau[j + 3][i + 3]) {
                variable.gaganant = variable.plateau[j][i];
                return true;
            }
        }
    }
    for (let i = 0; i < constante.largeurPlateau-3; i++) {
        for (let j = 3; j < constante.hauteurPlateau; j++) {
            if (variable.plateau[j][i] != "" && variable.plateau[j][i] == variable.plateau[j - 1][i + 1] && variable.plateau[j][i] == variable.plateau[j - 2][i + 2] && variable.plateau[j][i] == variable.plateau[j - 3][i + 3]) {
                variable.gaganant = variable.plateau[j][i];
                return true;
            }
        }
    }

}