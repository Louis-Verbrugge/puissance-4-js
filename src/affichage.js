

export function affichePiece() {
    alert("affichePiece");
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