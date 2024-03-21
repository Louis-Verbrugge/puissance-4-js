
import { constante, variable } from "./variable.js";


let rectagleAssombrissement;
let annimationEnCour = false;

let r, g, b;

export function testtesttest() {

    variable.finGame = true;

    rectagleAssombrissement = {
        x: 0,
        y: 0,
        opacity: 0,
        WIDTH: constante.WIDTH,
        HEIGHT: constante.HEIGHT
    }

    if (variable.gaganant == "red") {
        r=255;
        g=0;
        b=0;
    } else {
        r=255;
        g=255;
        b=0;
    }

    annimationEnCour = true;
    gsap.to(rectagleAssombrissement, {opacity: 1, duration: 5, onComplete: () => annimationEnCour = false})

    gsap.to(".imageFleche", { opacity: 0, duration: 0.5 });
}

export function pageFin() {

    if (annimationEnCour) {
        variable.context.fillStyle = `rgba(0, 0, 0, ${rectagleAssombrissement.opacity})`; 
        variable.context.fillRect(rectagleAssombrissement.x, rectagleAssombrissement.y, rectagleAssombrissement.WIDTH, rectagleAssombrissement.HEIGHT);
        
        variable.context.font = `${constante.WIDTH/10}px serif`;
        variable.context.fillStyle = `rgb(${r}, ${g}, ${b}, ${rectagleAssombrissement.opacity*4})`;
        variable.context.textAlign = "center";
        variable.context.fillText("Winner: " + variable.gaganant, constante.WIDTH / 2, constante.HEIGHT / 2);
    }

   
}

