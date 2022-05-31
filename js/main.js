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
    for(let i = 0; i < secuenciaSimon.length; i++) {
        const colorActual = secuenciaSimon[i];
        const $botonActual = document.querySelector(`#${colorActual}`);
        setTimeout(prenderBoton, i*1000, $botonActual);
        setTimeout(apagarBoton, i*1000+500, $botonActual);
        if (i === secuenciaSimon.length-1) {
            setTimeout(activarListeners, i*1000+500);
        }
    }
}

function prenderBoton($boton) {
    $boton.classList.remove("apagado");
    $boton.classList.add("prendido");
}

function apagarBoton($boton) {
    $boton.classList.remove("prendido");
    $boton.classList.add("apagado");
}

function evaluarEventoPrenderBoton(event) {
    const $botonActual = event.target;
    prenderBoton($botonActual);
}

function evaluarEventoApagarBoton(event) {
    const $botonActual = event.target;
    apagarBoton($botonActual);
}

function activarListeners() {
    const $botones = document.querySelectorAll("#tablero-simon .color-simon");
    $botones.forEach(function($boton) {
        $boton.addEventListener("click", evaluarColorUsuario);
        $boton.addEventListener("mousedown", evaluarEventoPrenderBoton);
        $boton.addEventListener("mouseup", evaluarEventoApagarBoton);
    })
}

function desactivarListeners() {
    const $botones = document.querySelectorAll("#tablero-simon .color-simon");
    $botones.forEach(function($boton) {
        $boton.removeEventListener("click", evaluarColorUsuario);
        $boton.removeEventListener("mousedown", evaluarEventoPrenderBoton);
        $boton.removeEventListener("mouseup", evaluarEventoApagarBoton);
    })
}

function evaluarColorUsuario(event) {
    const colorUsuario = event.target.id;
    if(colorUsuario === secuenciaSimon[cantMovimientosJugador]) {
        cantMovimientosJugador++;
        evaluarEstadoJuego();
    } else {
        console.log("perdiste");
        desactivarListeners();
        reiniciarSimon();
    }
}

function evaluarEstadoJuego() {
    if(secuenciaSimon.length === cantMovimientosJugador) {
        desactivarListeners();
        console.log("bien!");
        setTimeout(function() {
            cantMovimientosJugador = 0;
            agregarColorSimon();
            mostrarSecuenciaSimon();
        }, 1000);
    }
}
