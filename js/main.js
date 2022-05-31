let secuenciaSimon = [];
let cantMovimientosJugador = 0;

const $botonInformacion = document.querySelector("#boton-informacion");
const $botonComenzar = document.querySelector("#boton-comenzar");

$botonComenzar.onclick = function(event) {
    ejecutarSimonDice();
    event.preventDefault();
}

function obtenerElementoAleatorio(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

function ejecutarSimonDice() {
    agregarColorSimon();
    mostrarSecuenciaSimon();
    activarListeners();
}

function reiniciarSimon() {
    secuenciaSimon = [];
    cantMovimientosJugador = 0;
}

function agregarColorSimon() {
    const colores = ["rojo", "amarillo", "azul", "verde"];
    const nuevoColor = obtenerElementoAleatorio(colores);
    secuenciaSimon.push(nuevoColor);
}

function mostrarSecuenciaSimon() {
    console.log(secuenciaSimon);
}

function activarListeners() {
    const $botones = document.querySelectorAll("#tablero-simon .color-simon");
    $botones.forEach(function($boton) {
        $boton.addEventListener("click", evaluarColorUsuario);
    })
}

function desactivarListeners() {
    const $botones = document.querySelectorAll("#tablero-simon .color-simon");
    $botones.forEach(function($boton) {
        $boton.removeEventListener("click", evaluarColorUsuario);
    })
}

function evaluarColorUsuario(event) {
    const colorUsuario = event.target.id;
    if(colorUsuario === secuenciaSimon[cantMovimientosJugador]) {
        cantMovimientosJugador++;
        evaluarEstadoJuego();
    } else {
        console.log("Perdiste HDP!");
        desactivarListeners();
        reiniciarSimon();
    }
}

function evaluarEstadoJuego() {
    if(secuenciaSimon.length === cantMovimientosJugador) {
        agregarColorSimon();
        cantMovimientosJugador = 0;
        console.log("Bieen!");
        mostrarSecuenciaSimon();
    }
}
