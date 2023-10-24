import seedrandom from 'seedrandom';
import { rankRef } from './firebaseConfig';
let seedYaCreada;
let nombreGuardado;
let juegoTerminado = false;



document.addEventListener("DOMContentLoaded", function() {
    nombreGuardado = localStorage.getItem("nombre");
    seedYaCreada = localStorage.getItem("seed");
    console.log(nombreGuardado);
    console.log(seedYaCreada);

    const nombreElement = document.getElementById("nombre");
    if (nombreElement) {
        nombreElement.textContent = nombreGuardado;
    }
    const continueFunction = localStorage.getItem("continueFunction");

    if (continueFunction === "true") {
        // Ejecuta la función o la lógica que necesitas después de presionar "Continuar"
        cargarProgreso() // Ajusta el nombre de la función según tus necesidades

        // Limpia la señal en localStorage para que no se ejecute nuevamente
        localStorage.removeItem("continueFunction");
    }

});

// CHECKPOINT
let filaSuperiorIzquierda = [
    1
]; // Una matriz que almacena valores para referenciar las imagenes

let filaSuperiorDerecha = [
    1
];

let filaInferiorIzquierda = [
    100
];

let filaInferiorDerecha = [
    100
];
let arrayTemporal =[];

const fieldCard = {
    UnoIzq : "GAME1Izquierda",
    UnoDer : "GAME1Derecha",
    CienIzq : "GAME100Izquierda",
    CienDer : "GAME100Derecha"
};

function mostrarCartasTablero(){
    let vars1 = filaSuperiorIzquierda.slice(-1)[0];
    let vars2 = filaSuperiorDerecha.slice(-1)[0];
    let vars3 = filaInferiorIzquierda.slice(-1)[0];
    let vars4 = filaInferiorDerecha.slice(-1)[0];
    imageDisplaySuperiorIzquierda.src = `../IMG/GAME${vars1}.png`;
    imageDisplaySuperiorDerecha.src = `../IMG/GAME${vars2}.png`;
    imageDisplayInferiorIzquierda.src = `../IMG/GAME${vars3}.png`;
    imageDisplayInferiorDerecha.src = `../IMG/GAME${vars4}.png`;
}
function setImageCard(valorX,valorAdd){

    let miImagenL = document.getElementById(valorX);
    let vars = 0;
    const temporal2 = manoCartas[parseInt(valorAdd)];

    switch (valorX){

        case fieldCard.UnoIzq:
            filaSuperiorIzquierda.push(temporal2);
            vars = filaSuperiorIzquierda.slice(-1)[0];
            miImagenL.src = `../IMG/GAME${vars}.png`;
             eliminarCartaMano(valorAdd);
            arrayTemporal.push(temporal2);
            mostrarCartasEnMano();
            break;
        case fieldCard.UnoDer:
            filaSuperiorDerecha.push(temporal2);
            vars = filaSuperiorDerecha.slice(-1)[0];
            miImagenL.src = `../IMG/GAME${vars}.png`;
            eliminarCartaMano(valorAdd);
            arrayTemporal.push(temporal2);
            mostrarCartasEnMano();
            break;

        case fieldCard.CienIzq:
            filaInferiorIzquierda.push(temporal2);
            vars = filaInferiorIzquierda.slice(-1)[0];
            miImagenL.src = `../IMG/GAME${vars}.png`;
            eliminarCartaMano(valorAdd);
            arrayTemporal.push(temporal2);
            mostrarCartasEnMano();
            break;

        case fieldCard.CienDer:
            filaInferiorDerecha.push(temporal2);
            vars = filaInferiorDerecha.slice(-1)[0];
            miImagenL.src = `../IMG/GAME${vars}.png`;
            eliminarCartaMano(valorAdd);
            arrayTemporal.push(temporal2);
            mostrarCartasEnMano();
            break;

    }
}

function eliminarCartaMano(cartaMano) {
    manoCartas[cartaMano] = 0;
    mostrarCartasEnMano();
}
/*
function generarMazo() {
    if (mazoCartas.length === 0) {
        for (let i = 2; i <= 99; i++) {
            mazoCartas.push(i);
        }

        // Baraja el mazo (Fisher-Yates Shuffle)
        for (let i = mazoCartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mazoCartas[i], mazoCartas[j]] = [mazoCartas[j], mazoCartas[i]];
        }
    }
}
*/
function juegoComenzadoLS(){
    localStorage.setItem("juegoPendiente", "true");
}
let mazoCartas = [];
let juegoComenzado = false;
function comenzarGame() {
    if (juegoComenzado === false) {
        btnPasarTurnoContainer.classList.remove("disabled");
        btnPasarTurno.disabled = false;
        btnCancelarTurno.disabled = false;
        if (seedYaCreada){
            jugarPartida(seedYaCreada)
            manoCartas = [0, 0, 0, 0, 0, 0, 0, 0]
            displayCurrentImage()
            juegoComenzadoLS()
            guardarProgreso()
        }else {
            nuevaPartida()
            manoCartas = [0, 0, 0, 0, 0, 0, 0, 0]
            displayCurrentImage()
            juegoComenzadoLS()
            guardarProgreso()
        }
    }
    juegoComenzado = true;
}
let manoCartas = [];
/*
function obtenerCartasAleatorias() {
    while (manoCartas.length < 8 && mazoCartas.length > 0) {
        const cartaAleatoria = mazoCartas.pop();
        manoCartas.push(cartaAleatoria);
    }
}
*/


function mostrarCartasEnMano() {
    const cantidadDeCeros = manoCartas.filter(numero => numero === 0).length;

    // Calcular cuántos ceros deben estar al principio y cuántos al final
    const cerosAlPrincipio = Math.floor(cantidadDeCeros / 2);
    const cerosAlFinal = cantidadDeCeros - cerosAlPrincipio;

    // Filtrar los números no cero y ordenarlos de menor a mayor
    const numerosNoCero = manoCartas.filter(numero => numero !== 0);
    numerosNoCero.sort((a, b) => a - b);

    // Actualizar el mismo array con ceros al principio y al final
    manoCartas.length = 0; // Vaciar el array original
    for (let i = 0; i < cerosAlPrincipio; i++) {
        manoCartas.push(0);
    }
    manoCartas.push(...numerosNoCero);
    for (let i = 0; i < cerosAlFinal; i++) {
        manoCartas.push(0);
    }

    // Iterar sobre las cartas y mostrarlas o aplicar la clase 'hidden-card'
    for (let i = 0; i < manoCartas.length; i++) {
        const imageDisplay = document.getElementById(i);
        if (imageDisplay) {
            if (manoCartas[i] !== 0) {
                imageDisplay.src = `../IMG/GAME${manoCartas[i]}.png`;
                imageDisplay.classList.remove('hidden-card');
                imageDisplay.parentElement.classList.remove('zero'); // Mostrar cartas no cero
            } else {
                // Si el valor de la carta es 0, aplicar la clase CSS para ocultarla visualmente
                imageDisplay.classList.add('hidden-card');
                imageDisplay.parentElement.classList.add('zero');
            }
        }
    }
}


const imageDisplaySuperiorIzquierda = document.getElementById("GAME1Izquierda"); // Obtiene el elemento de imagen por su ID.
const imageDisplaySuperiorDerecha = document.getElementById("GAME1Derecha");
const imageDisplayInferiorIzquierda = document.getElementById("GAME100Izquierda");
const imageDisplayInferiorDerecha = document.getElementById("GAME100Derecha");

const imageDisplayMano1 = document.getElementById("0");
const imageDisplayMano2 = document.getElementById("1");
const imageDisplayMano3 = document.getElementById("2");
const imageDisplayMano4 = document.getElementById("3");
const imageDisplayMano5 = document.getElementById("4");
const imageDisplayMano6 = document.getElementById("5");
const imageDisplayMano7 = document.getElementById("6");
const imageDisplayMano8 = document.getElementById("7");

// Función que muestra la imagen actual en el elemento de imagen.
function displayCurrentImage() {

    //SuperiorIzquierda
    let miImagenL = document.getElementById("GAME1Izquierda");
    miImagenL.src = "../IMG/GAME1.png";

    //SuperiorDerecha
    let miImagenL1 = document.getElementById("GAME1Derecha");
    miImagenL1.src = "../IMG/GAME1.png";

    //InferiorIZquierda
    let miImagenL2 = document.getElementById("GAME100Izquierda");
    miImagenL2.src = "../IMG/GAME100.png";

    //InferiorDerecha
    let miImagenL3 = document.getElementById("GAME100Derecha");
    miImagenL3.src = "../IMG/GAME100.png";

}

// Llama a la función para mostrar la imagen actual en la carga inicial.

// Función para mostrar las matrices en la consola
function mostrarMatricesEnConsola() {
    console.log("filaSuperiorIzquierda:", filaSuperiorIzquierda);
    console.log("filaSuperiorDerecha:", filaSuperiorDerecha);
    console.log("filaInferiorIzquierda:", filaInferiorIzquierda);
    console.log("filaInferiorDerecha:", filaInferiorDerecha);
    console.log("mazoCartas:", mazoCartas);
    console.log("manoCartas:", manoCartas);
    console.log("ARRAY TEMPORTAL", arrayTemporal);
}

// Agrega un controlador de eventos al botón "Ver Matriz de Cartas"
const btnVerMatriz = document.getElementById("verMatriz");
btnVerMatriz.addEventListener("click", mostrarMatricesEnConsola);

function pasarTurno() {

    let cantidadDeCeros = 0;
    for (let i = 0; i < manoCartas.length; i++) {
        if (manoCartas[i] === 0) {
            cantidadDeCeros++;
        }
    }

    const zerosIndices = manoCartas.reduce((indices, carta, index) => {
        if (carta === 0) indices.push(index);
        return indices;
    }, []);

    if (zerosIndices.length >= 2) {
        const maxRandomCards = Math.min(zerosIndices.length, mazoCartas.length);


        if (maxRandomCards >= 2) {
            for (let i = 0; i < maxRandomCards; i++) {
                if (mazoCartas.length > 0) {
                    const card = mazoCartas.shift(); // Toma la primera carta del mazo
                    manoCartas[zerosIndices[i]] = card;
                } else {
                    // Manejo de error si no hay suficientes cartas en el mazo
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });

                    Toast.fire({
                        icon: 'error',
                        title: 'No tienes más cartas en el mazo!'
                    });

                    break; // Sale del bucle si no hay más cartas en el mazo
                }
            }
            arrayTemporal = [];
            guardarProgreso()
            mostrarCartasEnMano();
        }
        else if (maxRandomCards === 1) {
            const randomIndex = Math.floor(Math.random() * mazoCartas.length);
            const randomCard = mazoCartas.splice(randomIndex, 1)[0];

            const zeroIndex = zerosIndices[0];
            manoCartas[zeroIndex] = randomCard;
            arrayTemporal = [];
            guardarProgreso()
            mostrarCartasEnMano();
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'No tienes mas cartas en el mazo!'
            })
        }
    } else if (cantidadDeCeros === 0) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'warning',
            title: 'Debes colocar 2 cartas'
        })
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'warning',
            title: 'Debes colocar 1 carta mas'
        })
    }

    gameOverTurno();
    btnAnimation();


}


const btnPasarTurno = document.getElementById("btnTurno");
btnPasarTurno.addEventListener("click", pasarTurno);
const btnPasarTurnoIMG = document.getElementById("btnTurnoIMG");
btnPasarTurnoIMG.addEventListener("click", pasarTurno);
const btnPasarTurnoContainer = document.getElementById("btnPasarTurnoContainer");

let draggedElement = null;

function dragStart(event) {
    const cartaArrastrada = event.target;
    const cartaIndex = cartaArrastrada.id;
    console.log("ID = ", cartaIndex);
    console.log("CODIGO = ", cartaArrastrada);
    console.log("VALOR EN ARRAY = ", manoCartas[cartaIndex]);

    // Verifica si el valor correspondiente en el array manoCartas es igual a 0
    // o si el ID es "GAME1Izquierda" y el valor en filaSuperiorIzquierda es 1
    if (
        manoCartas[cartaIndex] === 0 ||
        (cartaArrastrada.id === "GAME1Izquierda" && filaSuperiorIzquierda[0] === 1) ||
        (cartaArrastrada.id === "GAME1Derecha" && filaSuperiorDerecha[0] === 1) ||
        (cartaArrastrada.id === "GAME100Izquierda" && filaInferiorIzquierda[0] === 100) ||
        (cartaArrastrada.id === "GAME100Derecha" && filaInferiorDerecha[0] === 100)
    ) {
        event.preventDefault(); // Evita iniciar el arrastre si el valor es 0 o es "GAME1Izquierda" con valor 1.
    } else {
        draggedElement = cartaArrastrada;
        // Establece el efecto de arrastre
        event.dataTransfer.effectAllowed = "move";
    }

}

function dragEnd() {
    // Restablece el elemento arrastrado a nulo después de soltarlo
    draggedElement = null;


}

function dragOver(event) {
    // Previene el comportamiento predeterminado de arrastrar y soltar
    event.preventDefault();
}

function drop(event) {
    // Previene el comportamiento predeterminado de arrastrar y soltar
    event.preventDefault();

    // Llama a tu función personalizada para manejar el evento de soltar carta
    moverCarta(draggedElement, event.target);

}

function gameOverMovimiento() {
    const ultimoValor100Derecha = filaInferiorDerecha[filaInferiorDerecha.length-1];
    const ultimoValor100Izquierda = filaInferiorIzquierda[filaInferiorIzquierda.length-1];
    const ultimoValor1Derecha = filaSuperiorDerecha[filaSuperiorDerecha.length-1];
    const ultimoValor1Izquierda = filaSuperiorIzquierda[filaSuperiorIzquierda.length-1];

    let cantidadDeCeros = 0;

    for (let i = 0; i < manoCartas.length; i++) {
        if (manoCartas[i] === 0) {
            cantidadDeCeros++;
        }
    }
    let mazoCheck;
    mazoCheck = mazoCartas.length;


    if (cantidadDeCeros === 0 || cantidadDeCeros === 1 || mazoCheck === 0)  {
        const valoresFiltrados = manoCartas.filter((valor) => valor !== 0);

// Verificar si todos los elementos filtrados son menores a filaSuperior
// y mayores a filaInferior
        const cumpleCondicion = valoresFiltrados.every((valor) => {
            return valor < ultimoValor1Derecha && valor < ultimoValor1Izquierda && valor > ultimoValor100Izquierda && valor > ultimoValor100Derecha;
        });
        let todasLasCartasSonCero = manoCartas.every(carta => carta === 0);
        if (cumpleCondicion && !(todasLasCartasSonCero && mazoCartas.length === 0)) {
            // Entra en el if si todas las condiciones se cumplen
            Swal.fire({
                title: 'Perdiste! no puedes colocar mas cartaszz',
                showDenyButton: true,
                showCancelButton: true,
                cancelButtonText: 'Ver tablero',
                confirmButtonText: 'Guardar partida',
                denyButtonText: `No guardar`,
                allowOutsideClick: false,
                allowEscapeKey: false,



            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Escribe tu nombre:',
                        input: 'text',
                        allowOutsideClick: false,
                        allowEscapeKey: false,


                        showCancelButton: true,
                        inputValidator: (value) => {
                            if (!value) {
                                return 'You need to write something!'
                            }
                        }
                    })

                    if (ipAddress) {
                        Swal.fire(`Your IP address is ${ipAddress}`)

                    }
                } else if (result.isDenied) {
                    Swal.fire('Cambios no guardados!', '', 'error')
                }
            })
            btnPasarTurno.disabled = true;
            btnCancelarTurno.disabled = true;
            btnPasarTurnoContainer.classList.add("disabled");
            cargarGameBaseDeDatos()
            juegoTerminado = true;
        }
    }
}
function gameOverTurno() {
    const ultimoValor100Derecha = filaInferiorDerecha[filaInferiorDerecha.length-1];
    const ultimoValor100Izquierda = filaInferiorIzquierda[filaInferiorIzquierda.length-1];
    const ultimoValor1Derecha = filaSuperiorDerecha[filaSuperiorDerecha.length-1];
    const ultimoValor1Izquierda = filaSuperiorIzquierda[filaSuperiorIzquierda.length-1];

    const valoresFiltrados = manoCartas.filter((valor) => valor !== 0);

// Verificar si todos los elementos filtrados son menores a filaSuperior
// y mayores a filaInferior
    const cumpleCondicion = valoresFiltrados.every((valor) => {
        return valor < ultimoValor1Derecha && valor < ultimoValor1Izquierda && valor > ultimoValor100Izquierda && valor > ultimoValor100Derecha;
    });

    if (cumpleCondicion) {
        // Entra en el if si todas las condiciones se cumplen
        Swal.fire({
            title: 'Perdiste! no puedes colocar mas cartas',
            showDenyButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,

            cancelButtonText: 'Ver tablero',
            confirmButtonText: 'Guardar partida',
            denyButtonText: `No guardar`,



        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Puntuaje guardado', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Cambios no guardados!', '', 'error')
            }
        })
        btnPasarTurno.disabled = true;
        btnCancelarTurno.disabled = true;
        btnPasarTurnoContainer.classList.add("disabled");
        cargarGameBaseDeDatos()
        juegoTerminado = true;
    } else {
        console.log("No todas las condiciones se cumplen.");
    }

}
function moverCarta(draggedCard, targetElement){

    const cartaMano = manoCartas[draggedCard.id];
    let arrayDestino;
    switch (targetElement.id) {
        case fieldCard.UnoIzq:
            arrayDestino = filaSuperiorIzquierda;
            break;
        case fieldCard.UnoDer:
            arrayDestino = filaSuperiorDerecha;
            break;
        case fieldCard.CienIzq:
            arrayDestino = filaInferiorIzquierda;
            break;
        case fieldCard.CienDer:
            arrayDestino = filaInferiorDerecha;
            break;
        default:
            return; // Salir si el destino no es válido
    }

    // Verificar si la carta de la mano es menor o mayor que la última carta en el campo destino
    if (
        (targetElement.id === fieldCard.UnoIzq || targetElement.id === fieldCard.UnoDer) &&
        (cartaMano > arrayDestino[arrayDestino.length - 1] || cartaMano === arrayDestino[arrayDestino.length - 1] - 10)
    ) {
        // Permitir el movimiento si es mayor (fila superior)
        setImageCard(targetElement.id, draggedCard.id);

    } else if (
        (targetElement.id === fieldCard.CienIzq || targetElement.id === fieldCard.CienDer) &&
        (cartaMano < arrayDestino[arrayDestino.length - 1] || cartaMano === arrayDestino[arrayDestino.length - 1] + 10)
    ) {
        // Permitir el movimiento si es menor (fila inferior)
        setImageCard(targetElement.id, draggedCard.id);

    } else {
        // Mostrar un mensaje de error y no permitir el movimiento
        Swal.fire({
            position: 'top-start',
            icon: 'error',
            title: 'No puedes colocar la carta en ese lugar',
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }

    // Verificar si todas las cartas en la mano son 0 y el mazo está vacío
    let todasLasCartasSonCero = manoCartas.every(carta => carta === 0);
    if (todasLasCartasSonCero && mazoCartas.length === 0) {
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: 'Custom width, padding, color, background.',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(../IMG/backgroundIMG.GIF)',
            backdrop: `
    rgba(0,0,123,0.4)
    url("../IMG/victoryIMG.GIF")
    left top
    no-repeat
  `
        })
        btnPasarTurno.disabled = true;
        btnCancelarTurno.disabled = true;
        btnPasarTurnoContainer.classList.add("disabled");
        cargarGameBaseDeDatos()
        juegoTerminado = true;
    }
    gameOverMovimiento();
    btnAnimation();
    guardarProgreso()

}

// Agrega un manejador de eventos para el inicio de arrastre
imageDisplaySuperiorIzquierda.addEventListener("dragstart", dragStart);
imageDisplaySuperiorDerecha.addEventListener("dragstart", dragStart);
imageDisplayInferiorIzquierda.addEventListener("dragstart", dragStart);
imageDisplayInferiorDerecha.addEventListener("dragstart", dragStart);
imageDisplayMano1.addEventListener("dragstart", dragStart);
imageDisplayMano2.addEventListener("dragstart", dragStart);
imageDisplayMano3.addEventListener("dragstart", dragStart);
imageDisplayMano4.addEventListener("dragstart", dragStart);
imageDisplayMano5.addEventListener("dragstart", dragStart);
imageDisplayMano6.addEventListener("dragstart", dragStart);
imageDisplayMano7.addEventListener("dragstart", dragStart);
imageDisplayMano8.addEventListener("dragstart", dragStart);

// Agrega un manejador de eventos para la finalización del arrastre
imageDisplaySuperiorIzquierda.addEventListener("dragend", dragEnd);
imageDisplaySuperiorDerecha.addEventListener("dragend", dragEnd);
imageDisplayInferiorIzquierda.addEventListener("dragend", dragEnd);
imageDisplayInferiorDerecha.addEventListener("dragend", dragEnd);
imageDisplayMano1.addEventListener("dragend", dragEnd);
imageDisplayMano2.addEventListener("dragend", dragEnd);
imageDisplayMano3.addEventListener("dragend", dragEnd);
imageDisplayMano4.addEventListener("dragend", dragEnd);
imageDisplayMano5.addEventListener("dragend", dragEnd);
imageDisplayMano6.addEventListener("dragend", dragEnd);
imageDisplayMano7.addEventListener("dragend", dragEnd);
imageDisplayMano8.addEventListener("dragend", dragEnd);

// Agrega un manejador de eventos para el objetivo de soltar
imageDisplaySuperiorIzquierda.addEventListener("dragover", dragOver);
imageDisplaySuperiorDerecha.addEventListener("dragover", dragOver);
imageDisplayInferiorIzquierda.addEventListener("dragover", dragOver);
imageDisplayInferiorDerecha.addEventListener("dragover", dragOver);
imageDisplayMano1.addEventListener("dragover", dragOver);
imageDisplayMano2.addEventListener("dragover", dragOver);
imageDisplayMano3.addEventListener("dragover", dragOver);
imageDisplayMano4.addEventListener("dragover", dragOver);
imageDisplayMano5.addEventListener("dragover", dragOver);
imageDisplayMano6.addEventListener("dragover", dragOver);
imageDisplayMano7.addEventListener("dragover", dragOver);
imageDisplayMano8.addEventListener("dragover", dragOver);

// Agrega un manejador de eventos para el soltar
imageDisplaySuperiorIzquierda.addEventListener("drop", drop);
imageDisplaySuperiorDerecha.addEventListener("drop", drop);
imageDisplayInferiorIzquierda.addEventListener("drop", drop);
imageDisplayInferiorDerecha.addEventListener("drop", drop);
imageDisplayMano1.addEventListener("drop", drop);
imageDisplayMano2.addEventListener("drop", drop);
imageDisplayMano3.addEventListener("drop", drop);
imageDisplayMano4.addEventListener("drop", drop);
imageDisplayMano5.addEventListener("drop", drop);
imageDisplayMano6.addEventListener("drop", drop);
imageDisplayMano7.addEventListener("drop", drop);
imageDisplayMano8.addEventListener("drop", drop);

const btnCancelarTurno = document.getElementById("btnCancelar");
btnCancelarTurno.addEventListener("click", cancelarTurno);
const btnComenzarGame = document.getElementById("btnGame");
btnComenzarGame.addEventListener("click", comenzarGame);
const btnSeed = document.getElementById("btnSeed");
btnSeed.addEventListener("click", mostrarSeed);
const btnReglas = document.getElementById("btnReglas");
btnReglas.addEventListener("click", reglas);
function cancelarTurno() {

    let cantidadDeCeroz = 0;
    for (let i = 0; i < manoCartas.length; i++) {
        if (manoCartas[i] === 0) {
            cantidadDeCeroz++;
        }
    } //contador de ceros

    const zerosIndicez = manoCartas.reduce((indices, carta, index) => {
        if (carta === 0) indices.push(index);
        return indices;
    }, []);

    if (arrayTemporal.length > 0) {
        const maxRandomCardz = Math.min(zerosIndicez.length, arrayTemporal.length);


        zerosIndicez.slice(0, maxRandomCardz).forEach((zeroIndex, i) => {
            manoCartas[zeroIndex] = arrayTemporal[i];
        });
        filaSuperiorDerecha = eliminarNumerosDuplicados(filaSuperiorDerecha, arrayTemporal);
        filaSuperiorIzquierda = eliminarNumerosDuplicados(filaSuperiorIzquierda, arrayTemporal);
        filaInferiorDerecha = eliminarNumerosDuplicados(filaInferiorDerecha, arrayTemporal);
        filaInferiorIzquierda = eliminarNumerosDuplicados(filaInferiorIzquierda, arrayTemporal);
        mostrarCartasEnMano();
        arrayTemporal = [];
        mostrarCartasTablero()
        guardarProgreso()


    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Aun no colocas cartas'
        })
    }
    btnAnimation();

}
function eliminarNumerosDuplicados(array, numerosAEliminar) {
    return array.filter(num => !numerosAEliminar.includes(num));

}
function btnAnimation() {
    let cantidadDeCerosz = 0;
    for (let i = 0; i < manoCartas.length; i++) {
        if (manoCartas[i] === 0) {
            cantidadDeCerosz++;
        }
    }

    const button = document.querySelector('.button');
    const buttonBack = document.querySelector('.IMGBACK');

    const regex = /^ring-animation\d+$/;
    const regexBack = /^REDBACK\d+$/;

    const classes = button.classList;
    const classesBack = buttonBack.classList;

    for (const className of classes) {
        if (regex.test(className)) {
            button.classList.remove(className);
        }
    }

    const redbackClasses = Array.from(classesBack).filter(className => regexBack.test(className) || className.startsWith('REDBACK'));

    for (const className of redbackClasses) {
        buttonBack.classList.remove(className);
    }

    buttonBack.classList.add('REDBACK' + cantidadDeCerosz);

    // Elimina las clases que comienzan con 'shadow'
    const shadowRegex = /^shadow\d+$/;
    for (const className of classesBack) {
        if (shadowRegex.test(className)) {
            buttonBack.classList.remove(className);
        }
    }

    let shadowClass = '';

    if (mazoCartas.length >= 1 && mazoCartas.length <= 19) {
        shadowClass = 'shadow6';
    } else if (mazoCartas.length >= 20 && mazoCartas.length <= 39) {
        shadowClass = 'shadow5';
    } else if (mazoCartas.length >= 40 && mazoCartas.length <= 59) {
        shadowClass = 'shadow4';
    } else if (mazoCartas.length >= 60 && mazoCartas.length <= 79) {
        shadowClass = 'shadow3';
    } else if (mazoCartas.length >= 80 && mazoCartas.length <= 100) {
        shadowClass = 'shadow2';
    } else if (mazoCartas.length === 0) {
        shadowClass = 'shadow7';
    }

    buttonBack.classList.add(shadowClass);

    switch (cantidadDeCerosz) {
        case 2:
            button.classList.add('ring-animation2');
            break;
        case 3:
            button.classList.add('ring-animation3');
            break;
        case 4:
            button.classList.add('ring-animation4');
            break;
        case 5:
            button.classList.add('ring-animation5');
            break;
        case 6:
            button.classList.add('ring-animation6');
            break;
        case 7:
            button.classList.add('ring-animation7');
            break;
        case 8:
            button.classList.add('ring-animation8');
            break;
        default:
            break;
    }
}

function guardarProgreso() {
    const arrayTemporalJSON = JSON.stringify(arrayTemporal);
    const mazoCartasJSON = JSON.stringify(mazoCartas);
    const manoCartasJSON = JSON.stringify(manoCartas);
    const boardSIJSON = JSON.stringify(filaSuperiorIzquierda);
    const boardSDJSON = JSON.stringify(filaSuperiorDerecha);
    const boardIIJSON = JSON.stringify(filaInferiorIzquierda);
    const boardIDJSON = JSON.stringify(filaInferiorDerecha);
    localStorage.setItem('arrayTemporal', arrayTemporalJSON);
    localStorage.setItem('mazoCartas', mazoCartasJSON);
    localStorage.setItem('manoCartas', manoCartasJSON);
    localStorage.setItem('filaSuperiorIzquierda', boardSIJSON);
    localStorage.setItem('filaSuperiorDerecha', boardSDJSON);
    localStorage.setItem('filaInferiorIzquierda', boardIIJSON);
    localStorage.setItem('filaInferiorDerecha', boardIDJSON);

}

function cargarProgreso() {
    const arrayTemporalJSON = localStorage.getItem('arrayTemporal');
    const mazoCartasJSON = localStorage.getItem('mazoCartas');
    const manoCartasJSON = localStorage.getItem('manoCartas');
    const boardSIJSON = localStorage.getItem('filaSuperiorIzquierda');
    const boardSDJSON = localStorage.getItem('filaSuperiorDerecha');
    const boardIIJSON = localStorage.getItem('filaInferiorIzquierda');
    const boardIDJSON = localStorage.getItem('filaInferiorDerecha');
    arrayTemporal = JSON.parse(arrayTemporalJSON);
    mazoCartas = JSON.parse(mazoCartasJSON);
    manoCartas = JSON.parse(manoCartasJSON);
    filaSuperiorIzquierda = JSON.parse(boardSIJSON);
    filaSuperiorDerecha = JSON.parse(boardSDJSON);
    filaInferiorIzquierda = JSON.parse(boardIIJSON);
    filaInferiorDerecha = JSON.parse(boardIDJSON);
    mostrarCartasEnMano();
    mostrarCartasTablero()

}



// Función para generar una semilla aleatoria única
function generarSemillaAleatoria() {
    return Math.random().toString(36).substring(2);
}

// Función para generar el mazo con una semilla y devolverlo junto con la semilla
function generarMazoConSemilla(semilla) {
    const rng = seedrandom(semilla); // Crea la función generadora de números pseudoaleatorios con la semilla
    mazoCartas = [];

    for (let i = 2; i <= 10; i++) {
        mazoCartas.push(i);
    }

    // Baraja el mazo (Fisher-Yates Shuffle) utilizando la función generadora
    for (let i = mazoCartas.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [mazoCartas[i], mazoCartas[j]] = [mazoCartas[j], mazoCartas[i]];
    }

    return { mazo: mazoCartas, semilla }; // Devuelve el mazo y la semilla
}
let resultadoGeneracion;

// Función para jugar una partida con una semilla
function jugarPartida(semilla) {
    resultadoGeneracion = generarMazoConSemilla(semilla);

    console.log("Semilla utilizada:", resultadoGeneracion.semilla);
    console.log("Mazo generado:", resultadoGeneracion.mazo);
    // Aquí puedes continuar con la lógica del juego utilizando el mazo generado
}

// Función para iniciar una nueva partida con una semilla aleatoria
function nuevaPartida() {
    const semillaAleatoria = generarSemillaAleatoria();
    console.log("Nueva partida con semilla aleatoria:", semillaAleatoria);
    jugarPartida(semillaAleatoria);
}




function mostrarSeed(){

    Swal.fire(
        'Good job!',
        `Tu semilla del mazo es: ${resultadoGeneracion.semilla}`,
        'success'
    )
}
function reglas(){

    Swal.fire({
        title: 'REGLAS THE GAME',
        imageUrl: '../IMG/rules.png',
        imageAlt: 'RULES'
    })
}
const salirGame = document.getElementById("salir");
salirGame.addEventListener("click", salirGameF);
function salirGameF() {
    Swal.fire({
        title: '¿Seguro que quieres salir? ¡Perderás tu progreso!',
        showCancelButton: true,
        confirmButtonText: 'Salir',
    }).then((result) => {
        if (result.isConfirmed) {
            if (!juegoTerminado){
                cargarGameBaseDeDatos()
            }
            window.location.href = "index.html";
        }
    });
}
let score;
function procesarScore(){
    const mazoScore = mazoCartas.length;
    let count = 0;
    for (let i = 0; i < manoCartas.length; i++) {
        if (manoCartas[i] !== 0) {
            count++;
        }
    }
    score = mazoScore + count;
}
function cargarGameBaseDeDatos() {
    procesarScore();
    const nuevoUsuario = {
        nombre: nombreGuardado,
        score: score,
        seed: resultadoGeneracion.semilla,
        vecesjugada: 1, // Inicialmente establecido en 1
    };

    if (nuevoUsuario) {
        // Consulta a la base de datos para verificar registros existentes
        rankRef.orderByChild('nombre').equalTo(nuevoUsuario.nombre).once('value', (snapshot) => {
            const records = snapshot.val();

            if (records !== null) {
                // Se encontraron registros para el jugador, verifica si ya jugó con la semilla.
                for (const key in records) {
                    if (records[key].seed === nuevoUsuario.seed) {
                        console.log(nuevoUsuario.score);
                        console.log(records[key].score);
                        // Ya jugó con esta semilla, verifica el score.
                        if (nuevoUsuario.score < records[key].score) {
                            // Nuevo score es menor, actualiza el registro.
                            const nuevasVecesJugadas = records[key].vecesjugada + 1;
                            rankRef.child(key).update({ score: nuevoUsuario.score, vecesjugada: nuevasVecesJugadas });
                            localStorage.clear();
                        } else {
                            // Nuevo score es igual o mayor, aumenta veces jugadas.
                            rankRef.child(key).update({ vecesjugada: records[key].vecesjugada + 1 });
                            localStorage.clear();
                        }
                        return;
                    }
                }
            }

            // No se encontró un registro con la misma semilla o el nuevo score es igual o mayor.
            // Verifica si hay menos de 10 registros o si el score es menor que el score más alto
            rankRef.once('value', (snapshot) => {
                const allScores = snapshot.val();
                const sortedScores = Object.keys(allScores)
                    .map(key => ({ ...allScores[key], id: key })) // Incluye la clave en los objetos
                    .sort((a, b) => b.score - a.score || b.vecesjugada - a.vecesjugada);
                const recordWithHighestScore = sortedScores[0];

                console.log('Score más alto: ' + recordWithHighestScore.score); // Para comprobar el score más alto
                console.log('Score más alto: ' + recordWithHighestScore.score); // Para comprobar el score más alto// Para comprobar el score más alto
                console.log('Score más alto: ' + recordWithHighestScore.score); // Para comprobar el score más alto
                console.log('Score más alto: ' + recordWithHighestScore.score); // Para comprobar el score más alto
                console.log('Sccore del ingresante ' + nuevoUsuario.score);
                console.log('Score más alto: ' + recordWithHighestScore.score);
                console.log('Veces jugadas del ingresante ' + nuevoUsuario.vecesjugada);
                console.log('Veces jugadas del mayoer score ' + recordWithHighestScore.vecesjugada);

                if (sortedScores.length < 50 || nuevoUsuario.score < recordWithHighestScore.score || (nuevoUsuario.score === recordWithHighestScore.score && nuevoUsuario.vecesjugada < recordWithHighestScore.vecesjugada)) {
                    // Hay menos de 10 registros o el nuevo score es menor que el score más alto, o el score es igual pero tiene menos veces jugadas, agrega un nuevo registro a la base de datos.
                    rankRef.push(nuevoUsuario);

                    // Si hay 10 registros, elimina el registro con el score más alto y la mayor cantidad de veces jugadas.
                    if (sortedScores.length === 50) {
                        rankRef.child(recordWithHighestScore.id).remove();
                    }

                    localStorage.clear();
                }
            });

        });
    } else {
        console.log('No se encontraron datos en el localStorage');
    }
}






const btnScore = document.getElementById("btnScore");
const modal = document.getElementById("myModal");


btnScore.addEventListener("click", function() {
    modal.style.display = "block";
});


const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});


window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


const svg = `
<svg version="1.1" height="96" width="96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <style>
  use { fill: red; animation: .4s infinite ease, color 1s infinite linear alternate;}
  @keyframes color {to {fill: green}}
  @keyframes left {to {transform: translate(-32px, 0)}}
  @keyframes down {to {transform: translate(0, 32px)}}
  @keyframes right {to {transform: translate(32px, 0)}}
  @keyframes up {to {transform: translate(0, -32px)}}
 </style>
 <defs>
  <path id="skull" d="m16.779 11.591c-0.344 0.085-0.515-0.296-0.541-0.610-0.063-0.740 0.076-1.182 0.008-1.576-0.076-0.447 0.192-1.170-0.420-0.931-0.348 0.136-0.059 0.488 0.067 0.857 0.125 0.370 0.093 1.615 0.093 1.877 0.000 0.455 0.282 0.722 1.033 0.967 0.864 0.282 0.176 2.121-0.657 2.332-0.866 0.219-1.352-0.324-1.972-0.227-1.095 0.171-0.876 1.138-1.095 1.451-0.219 0.313-0.219 0.313-0.594 0.654-0.276 0.251-0.457 0.452-0.650 0.611 0.030 0.024 0.052 0.065 0.057 0.134 0.024 0.299 0.288 0.528 0.288 0.827 0.000 0.299-0.105 0.405-0.527 0.490-0.422 0.086-0.608-0.064-0.632-0.191-0.023-0.128 0.035-0.595 0.103-0.844 0.022-0.082 0.053-0.132 0.086-0.166-0.343 0.056-0.771 0.078-1.071 0.078-0.011 0.000-0.022 0.000 -0.033 0.000 0.073 0.044 0.152 0.120 0.201 0.256 0.119 0.324 0.137 0.569 0.161 0.761 0.023 0.192-0.258 0.256-0.540 0.277-0.282 0.021-0.610-0.064-0.657-0.171-0.047-0.106 0.031-0.551 0.079-0.781 0.029-0.140 0.186-0.261 0.307-0.336-0.317 0.006-0.655 0.017-1.000 0.022 0.092 0.090 0.182 0.200 0.204 0.306 0.048 0.231 0.152 0.576 0.129 0.725-0.024 0.149-0.094 0.192-0.540 0.214-0.446 0.021-0.596-0.043-0.643-0.128-0.047-0.086 0.034-0.597 0.090-0.808 0.030-0.113 0.123-0.224 0.208-0.307-0.278-0.003-0.556-0.013-0.825-0.033 0.066 0.167 0.368 0.453 0.288 0.913-0.045 0.256-0.177 0.363-0.785 0.364-0.352 0.001 -0.515-0.214-0.516-0.363-0.002-0.409 0.188-0.694 0.288-0.987-0.338-0.035-0.543-0.060-0.710-0.123 0.023 0.138 0.114 0.502 0.163 0.875 0.031 0.234-0.094 0.363-0.399 0.363-0.305 0.000-0.493-0.149-0.493-0.277 0.000-0.341 0.552-0.976 0.597-1.003 0.005-0.003 0.010-0.007 0.015-0.011-0.032-0.018-0.064-0.037-0.096-0.060-0.282-0.199-0.626-0.482-0.809-1.204-0.183-0.722-0.118-1.162-0.729-1.495-0.611-0.333-1.712 0.464-2.262 0.412-0.612-0.058-1.387-1.172-1.436-1.697-0.058-0.613 0.600-0.329 0.974-1.105 0.238-0.494 0.001-1.112 0.001-2.500 0.000-1.388 0.525-2.095 0.857-2.776 0.241-0.496-0.093-0.864 0.332-2.160 0.364-1.106 0.691-1.518 0.691-1.518s-0.586 0.438-0.929 1.470c-0.305 0.914-0.212 1.374-0.456 2.096-0.244 0.722-0.614 1.197-0.797 2.307-0.183 1.110 0.124 2.464-0.183 2.913-0.207 0.302-0.893-0.024-0.982-1.139-0.077-0.956-0.213-2.846-0.030-3.956 0.183-1.110 0.291-0.698 0.937-2.739 0.761-2.406 4.081-3.871 8.044-3.920 3.462-0.043 4.728 0.977 5.859 1.948 1.180 1.013 2.003 2.430 2.253 3.340 0.250 0.910 0.469 1.288 0.626 2.056 0.157 0.768 0.072 1.883-0.080 2.438-0.170 0.617-0.503 1.696-0.952 1.808zm-9.499-2.444c-0.446-0.640-1.644-0.751-2.558-0.789-1.009-0.043-1.562 0.240-1.666 0.939-0.085 0.564 0.023 1.408 0.235 2.026 0.184 0.538 0.915 1.259 1.549 1.173 0.509-0.069 1.595-0.808 2.230-1.472 0.379-0.397 0.426-1.569 0.211-1.877zm1.408 1.728c-0.235 0.015-0.587 0.725-0.751 1.621-0.108 0.590-0.539 1.415-0.446 1.920 0.062 0.339 0.409 0.388 0.610 0.021 0.164-0.298 0.258-0.576 0.493-0.576 0.235 0.000 0.753 1.250 1.056 1.216 0.350-0.039 0.782-0.533 0.728-1.152-0.047-0.533-0.282-1.067-0.634-1.621-0.352-0.555-0.823-1.444-1.056-1.429zm5.703-1.728c-0.352-0.427-0.962-0.789-2.159-0.725-0.990 0.053-1.976 0.416-2.065 1.024-0.093 0.640 0.106 0.974 0.493 1.408 0.399 0.448 1.525 1.323 2.252 1.365 0.728 0.043 1.361-0.107 1.455-0.768 0.094-0.661 0.375-1.877 0.023-2.304zm-1.619 10.389c0.563-0.512 0.470-1.387 0.704-2.496 0.234-1.109 0.657-1.451 0.938-1.834 0.282-0.384 0.954-0.332 1.033-0.171 0.094 0.192-0.193 1.487-0.469 2.325-0.422 1.280-0.446 1.792-0.469 2.453-0.020 0.565-1.009 1.003-1.525 1.451-0.517 0.448-0.986 1.280-1.619 1.451-0.634 0.171-1.526-0.128-2.488-0.107-0.962 0.021-1.924 0.235-2.441 0.064-0.516-0.170-1.103-0.960-1.760-1.493-0.657-0.534-1.432-0.854-1.666-1.365-0.235-0.512 0.000-1.131-0.047-1.920-0.047-0.789-0.282-1.280-0.516-1.749-0.235-0.469-0.079-0.808 0.305-0.938 0.563-0.192 0.962 0.235 1.244 1.045 0.294 0.846 0.555 1.343 0.610 2.048 0.070 0.896 0.211 1.066 0.540 1.386 0.187 0.183 0.532 0.292 0.895 0.383-0.067-0.160-0.127-0.368-0.097-0.746 0.015-0.192 0.188-0.256 0.563-0.277 0.376-0.021 0.624 0.064 0.634 0.235 0.032 0.563-0.119 0.803-0.227 0.992 0.202 0.028 0.500 0.045 0.843 0.054-0.127-0.232-0.262-0.499-0.263-0.940-0.001 -0.253 0.211-0.213 0.563-0.234 0.352-0.021 0.714-0.025 0.727 0.192 0.027 0.439-0.138 0.724-0.288 0.992 0.253 0.000 0.510-0.002 0.757-0.005-0.103-0.289-0.193-0.662-0.140-0.987 0.021-0.129 0.329-0.171 0.611-0.192 0.281-0.021 0.624 0.105 0.634 0.256 0.021 0.333-0.090 0.655-0.217 0.907 0.169-0.004 0.316-0.008 0.427-0.011 0.106-0.003 0.213-0.010 0.320-0.020-0.121-0.208-0.239-0.470-0.225-0.683 0.010-0.172 0.422-0.534 0.751-0.512 0.262 0.017 0.542 0.068 0.557 0.196 0.031 0.270-0.062 0.563-0.177 0.808 0.368-0.125 0.708-0.308 0.981-0.556z" />
 </defs>
 <use href="#skull" x="0" y="0"  style="animation-name: down, color"/>
 <use href="#skull" x="32" y="0" style="animation-name: left, color"/>
 <use href="#skull" x="64" y="0" style="animation-name: left, color"/>
 <use href="#skull" x="0" y="32" style="animation-name: down, color"/>
 <use href="#skull" x="0" y="64" style="animation-name: right, color"/>
 <use href="#skull" x="32" y="64" style="animation-name: right, color"/>
 <use href="#skull" x="64" y="64" style="animation-name: up, color"/>
 <use href="#skull" x="64" y="32" style="animation-name: up, color"/>
</svg>
`;

const blob = new Blob([svg], {type: 'image/svg+xml'})
const svgUrl = URL.createObjectURL(blob);
document.querySelector('.skulls').style.borderImageSource = `url(${svgUrl})`;
btnPasarTurno.disabled = true;
btnCancelarTurno.disabled = true;
btnPasarTurnoContainer.classList.add("disabled");
