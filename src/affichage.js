

import { constante, variable } from "./variable.js";


function changeTextHTML(baliseHTML, text) {
    baliseHTML.innerHTML = text;
}


export function affichePiece() {
    variable.plateau.forEach((ligne, y) => {
        ligne.forEach((colone, x) => {
            if (colone === "red") {
                variable.context.drawImage(constante.imagePieceRed, x * constante.largeurGrilleX, y * constante.largeurGrilleY, constante.largeurGrilleX, constante.largeurGrilleY);
            } else if (colone === "yellow") {
                variable.context.drawImage(constante.imagePieceYellow, x * constante.largeurGrilleX, y * constante.largeurGrilleY, constante.largeurGrilleX, constante.largeurGrilleY);
            }
        })
    })
}

export function annim(pieceMouvementt) {
    gsap.to(".imageFleche", { x: pieceMouvementt.newPosX, duration: 0.5, ease: pieceMouvementt.ease })
}

export function annimPiece(pieceMouvementtt) {
    variable.nbTour++;
    changeTextHTML(variable.textNbTour, "Tour: " + variable.nbTour);
    if (constante.joueurActuel == 0) {
        changeTextHTML(textJoueur, "Joueur: " + 2);
    } else {
        changeTextHTML(textJoueur, "Joueur: " + 1);
    }

    constante.annimationGSAP = gsap.fromTo(pieceMouvementtt, {
        x: pieceMouvementtt.x,
        y: pieceMouvementtt.y
    }, {
        x: pieceMouvementtt.newPosX,
        y: pieceMouvementtt.newPosY,
        duration: 1,
        ease: pieceMouvementtt.ease,
        onComplete: () => {

            if (constante.joueurActuel == 0) {
                constante.couleurAffichePiece = "red";
                constante.joueurActuel = 1;
            } else {
                constante.couleurAffichePiece = "yellow";
                constante.joueurActuel = 0;
            }
            constante.pieceEnCoursMouvement = false;
            variable.plateau[Math.round((pieceMouvementtt.newPosY) / constante.largeurGrilleY)][Math.round(pieceMouvementtt.newPosX / constante.largeurGrilleX)] = constante.couleurAffichePiece;
        }
    })
}