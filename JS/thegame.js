
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


const mazoCartas = [];
function comenzarGame() {
    for (let i = 2; i <= 99; i++) {
        mazoCartas.push(i);
    }
    obtenerCartasAleatorias()
    mostrarCartasEnMano()

}
const manoCartas = [];

function obtenerCartasAleatorias() {
    while (manoCartas.length < 8 && mazoCartas.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * mazoCartas.length);
        const cartaAleatoria = mazoCartas.splice(indiceAleatorio, 1)[0];
        manoCartas.push(cartaAleatoria);
    }


}

// Llama a la función para obtener cartas aleatorias al cargar la página
obtenerCartasAleatorias();

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



// Llama a la función para mostrar las cartas en la mano

mostrarCartasEnMano();

const imageDisplaySuperiorIzquierda = document.getElementById("GAME100Izquierda"); // Obtiene el elemento de imagen por su ID.
const imageDisplaySuperiorDerecha = document.getElementById("GAME100Derecha");
const imageDisplayInferiorIzquierda = document.getElementById("GAME1Izquierda");
const imageDisplayInferiorDerecha = document.getElementById("GAME1Derecha");

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

displayCurrentImage(); // Llama a la función para mostrar la imagen actual en la carga inicial.

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
            const randomCards = Array.from({ length: maxRandomCards }, () => {
                const randomIndex = Math.floor(Math.random() * mazoCartas.length);
                return mazoCartas.splice(randomIndex, 1)[0];
            });
            console.log("que es :" + randomCards);

            zerosIndices.slice(0, maxRandomCards).forEach((zeroIndex, i) => {
                manoCartas[zeroIndex] = randomCards[i];
            });
            arrayTemporal = [];
            mostrarCartasEnMano();
        } else if (maxRandomCards === 1) {
            const randomIndex = Math.floor(Math.random() * mazoCartas.length);
            const randomCard = mazoCartas.splice(randomIndex, 1)[0];

            const zeroIndex = zerosIndices[0];
            manoCartas[zeroIndex] = randomCard;
            arrayTemporal = [];
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
    } else if(cantidadDeCeros === 0){
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
    }else{
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



            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Escribe tu nombre:',
                        input: 'text',


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
        arrayDestino.push(cartaMano);

    } else if (
        (targetElement.id === fieldCard.CienIzq || targetElement.id === fieldCard.CienDer) &&
        (cartaMano < arrayDestino[arrayDestino.length - 1] || cartaMano === arrayDestino[arrayDestino.length - 1] + 10)
    ) {
        // Permitir el movimiento si es menor (fila inferior)
        setImageCard(targetElement.id, draggedCard.id);
        arrayDestino.push(cartaMano);
    } else {
        // Mostrar un mensaje de error y no permitir el movimiento
        Swal.fire({
            position: 'top-end',
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
    }
    gameOverMovimiento();
    btnAnimation();

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
function cancelarTurno(){
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
        const ultimoValor100Derecha = filaInferiorDerecha[filaInferiorDerecha.length-1];
        const ultimoValor100Izquierda = filaInferiorIzquierda[filaInferiorIzquierda.length-1];
        const ultimoValor1Derecha = filaSuperiorDerecha[filaSuperiorDerecha.length-1];
        const ultimoValor1Izquierda = filaSuperiorIzquierda[filaSuperiorIzquierda.length-1];

        imageDisplaySuperiorDerecha.src = `../IMG/GAME${ultimoValor100Derecha}.png`;
        imageDisplaySuperiorIzquierda.src = `../IMG/GAME${ultimoValor100Izquierda}.png`;
        imageDisplayInferiorDerecha.src = `../IMG/GAME${ultimoValor1Derecha}.png`;
        imageDisplayInferiorIzquierda.src = `../IMG/GAME${ultimoValor1Izquierda}.png`;


    }else{
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
