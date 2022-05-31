let secuenciaSimon = [];
let cantMovimientosJugador = 0;
let temporizadoresEnMarcha = [];

const $botonReiniciar = document.querySelector("#boton-reiniciar");
const $botonComenzar = document.querySelector("#boton-comenzar");

$botonComenzar.onclick = function(event) {
    ocultarElemento($botonComenzar);
    desocultarElemento($botonReiniciar);
    ejecutarSimonDice();
    event.preventDefault();
}

$botonReiniciar.onclick = function(event) {
    desactivarListeners();
    reiniciarTemporizadores();
    reiniciarSimon();
    event.preventDefault();
}

function obtenerElementoAleatorio(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

function eliminarElemento(array, elemento) {
    const indice = array.indexOf(elemento);
    array.splice(indice, 1);
}

function ejecutarSimonDice() {
    agregarColorSimon();
    mostrarSecuenciaSimon();
}

function reiniciarSimon() {
    desocultarElemento($botonComenzar);
    ocultarElemento($botonReiniciar);
    apagarBotones();
    secuenciaSimon = [];
    cantMovimientosJugador = 0;
}

function reiniciarTemporizadores() {
    temporizadoresEnMarcha.forEach(function(temporizador) {
        clearTimeout(temporizador);
    });
    temporizadoresEnMarcha = [];
}

function apagarBotones() {
    const $botones = document.querySelectorAll("#tablero-simon .color-simon");
    $botones.forEach(function($boton) {
        apagarBoton($boton);
    });
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

        let t1 = setTimeout(prenderBoton, i*1000, $botonActual);
        temporizadoresEnMarcha.push(t1);
        setTimeout(function(){eliminarElemento(temporizadoresEnMarcha, t1)}, i*1000);

        let t2 = setTimeout(apagarBoton, i*1000+500, $botonActual);
        temporizadoresEnMarcha.push(t2);
        setTimeout(function(){eliminarElemento(temporizadoresEnMarcha, t2)}, i*1000+500);
        if (i === secuenciaSimon.length-1) {
            let t3 = setTimeout(activarListeners, i*1000+500);
            temporizadoresEnMarcha.push(t3);
            setTimeout(function(){eliminarElemento(temporizadoresEnMarcha, t3)}, i*1000+500);
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
        let t4 = setTimeout(function() {
            cantMovimientosJugador = 0;
            agregarColorSimon();
            mostrarSecuenciaSimon();
        }, 1000);
        temporizadoresEnMarcha.push(t4);
        setTimeout(function(){eliminarElemento(temporizadoresEnMarcha, t4)}, 1000);
    }
}

function ocultarElemento($elemento) {
    $elemento.classList.add("oculto");
}

function desocultarElemento($elemento) {
    $elemento.classList.remove("oculto");
}