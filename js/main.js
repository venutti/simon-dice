const $botonComenzar = document.querySelector("#boton-comenzar");

$botonComenzar.onclick = function(event) {

    ejecutarSimonDice();

    console.log("Terminó el juego!");

    event.preventDefault();
}
function obtenerElementoAleatorio(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

function ejecutarSimonDice() {
    const colores = ["rojo", "amarillo", "azul", "verde"];
    const secuenciaSimon = [];
    let seguirJugando = true;

    while(seguirJugando) {
        const nuevoColor = obtenerElementoAleatorio(colores);
        secuenciaSimon.push(nuevoColor);

        // esperar interaccion del usuario

        console.log(secuenciaSimon);
        if(secuenciaSimon.length > 20) {
            seguirJugando = false;
        }
    }
}
