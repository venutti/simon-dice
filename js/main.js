let secuenciaSimon = [];
let cantMovimientosJugador = 0;
let ronda = 0;

const $botonComenzar = document.querySelector("#boton-comenzar");

cambiarContadorRonda("--");
desactivarListeners();
cambiarMensajeEstado("Toca 'JUGAR' para empezar!");

$botonComenzar.onclick = ejecutarSimon;

function ejecutarSimon() {
    reiniciarSimon();
    manejarRonda();
}

function manejarRonda() {
    //reset
    cambiarMensajeEstado("Turno de la máquina");
    desactivarListeners();
    agregarColorSimon();
    cantMovimientosJugador = 0;
    ronda++;
    cambiarContadorRonda(ronda);
    
    //display
    const RETRASO_TURNO_JUGADOR = (secuenciaSimon.length + 1) * 1000;
    secuenciaSimon.forEach(function(color, index) {
        const $boton = document.querySelector(`#${color}`);
        const RETRASO_DISPLAY_COLOR = (index + 1) * 1000;
        setTimeout(function() {
            parpadearBoton($boton);
        }, RETRASO_DISPLAY_COLOR);
    });
    setTimeout(function() {
        cambiarMensajeEstado("Tu turno!");
        activarListeners();
    }, RETRASO_TURNO_JUGADOR);
}

function evaluarColorUsuario(event) {
    const colorUsuario = event.target.id;
    if(colorUsuario !== secuenciaSimon[cantMovimientosJugador])  {
        perder();
        return;
    }
    cantMovimientosJugador++;
    //Evaluar estado de secuencia
    if(secuenciaSimon.length === cantMovimientosJugador) {
        desactivarListeners();
        setTimeout(manejarRonda, 500);
    }
}

function perder() {
    desactivarListeners();
    cambiarMensajeEstado("Upps, perdiste! Toca 'JUGAR' para volver a intentarlo.");
}


function reiniciarSimon() {
    secuenciaSimon = [];
    cantMovimientosJugador = 0;
    ronda = 0;
}

function agregarColorSimon() {
    const colores = ["rojo", "amarillo", "azul", "verde"];
    const nuevoColor = obtenerElementoAleatorio(colores);
    secuenciaSimon.push(nuevoColor);
}
/*
function mostrarSecuenciaSimon(index=0) {
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
            let t3 = setTimeout(function() {
                activarListeners();
                cambiarContadorRonda();
            }, i*1000+500);
            temporizadoresEnMarcha.push(t3);
            setTimeout(function(){eliminarElemento(temporizadoresEnMarcha, t3)}, i*1000+500);
        }
    }
}
*/

function prenderBoton($boton) {
    $boton.style.opacity = 1;
}

function apagarBoton($boton) {
    $boton.style.opacity = 0.5;
}

function parpadearBoton($boton) {
    prenderBoton($boton);
    setTimeout(apagarBoton, 500, $boton);
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

function cambiarContadorRonda(placeholder=undefined) {
    const $contador = document.querySelector("#contador-ronda");
    $contador.textContent = placeholder;
}

function cambiarMensajeEstado(mensaje) {
    document.querySelector("#msj-estado").textContent = mensaje;
}

//FUNCIONES DE ARRAY
function obtenerElementoAleatorio(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

function eliminarElemento(array, elemento) {
    const indice = array.indexOf(elemento);
    array.splice(indice, 1);
}
