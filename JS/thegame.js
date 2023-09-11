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
            mostrarCartasEnMano();
            break;
        case fieldCard.UnoDer:
            filaSuperiorDerecha.push(temporal2);
            vars = filaSuperiorDerecha.slice(-1)[0];
            miImagenL.src = `../IMG/GAME${vars}.png`;
            eliminarCartaMano(valorAdd);
            mostrarCartasEnMano();
            break;

        case fieldCard.CienIzq:
            filaInferiorIzquierda.push(temporal2);
            vars = filaInferiorIzquierda.slice(-1)[0];
            miImagenL.src = `../IMG/GAME${vars}.png`;
            eliminarCartaMano(valorAdd);
            mostrarCartasEnMano();
            break;

        case fieldCard.CienDer:
            filaInferiorDerecha.push(temporal2);
            vars = filaInferiorDerecha.slice(-1)[0];
            miImagenL.src = `../IMG/GAME${vars}.png`;
            eliminarCartaMano(valorAdd);
            mostrarCartasEnMano();
            break;
    }
}

function eliminarCartaMano(cartaMano){
    console.log(cartaMano)
    let nuevoValor = 0;
    manoCartas[cartaMano] = nuevoValor;
    console.log("El nuevo array es:", manoCartas);
}

const mazoCartas = [];

for (let i = 2; i <= 99; i++) {
    mazoCartas.push(i);
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
    for (let i = 0; i <= manoCartas.length; i++) {

        const imageDisplay = document.getElementById(i);
        if (imageDisplay) {
            imageDisplay.src = `../IMG/GAME${manoCartas[i]}.png`;

        }
    }
}

// Llama a la función para mostrar las cartas en la mano
mostrarCartasEnMano();

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

displayCurrentImage(); // Llama a la función para mostrar la imagen actual en la carga inicial.

// Función para mostrar las matrices en la consola
function mostrarMatricesEnConsola() {
    console.log("filaSuperiorIzquierda:", filaSuperiorIzquierda);
    console.log("filaSuperiorDerecha:", filaSuperiorDerecha);
    console.log("filaInferiorIzquierda:", filaInferiorIzquierda);
    console.log("filaInferiorDerecha:", filaInferiorDerecha);
    console.log("mazoCartas:", mazoCartas);
    console.log("manoCartas:", manoCartas);
}

// Agrega un controlador de eventos al botón "Ver Matriz de Cartas"
const btnVerMatriz = document.getElementById("verMatriz");
btnVerMatriz.addEventListener("click", mostrarMatricesEnConsola);

function pasarTurno(){

    const zerosIndices = [];
    for (let i = 0; i < manoCartas.length; i++) {
        if (manoCartas[i] === 0) {
            zerosIndices.push(i);
        }
    }
    console.log(zerosIndices);

    // Calcular cuántas cartas aleatorias podemos obtener del mazo
    const maxRandomCards = Math.min(zerosIndices.length, mazoCartas.length);

    console.log(maxRandomCards);

}
const btnPasarTurno = document.getElementById("btnTurno");
btnPasarTurno.addEventListener("click", pasarTurno);

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

function moverCarta(draggedCard, targetElement){

    setImageCard(targetElement.id, draggedCard.id);

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
