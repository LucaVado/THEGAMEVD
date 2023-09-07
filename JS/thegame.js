

let filaSuperiorIzquierda = [
    "../IMG/GAME1.png"
]; // Una matriz que almacena las rutas de las imágenes en la carpeta "IMG".
let filaSuperiorDerecha = [
    "../IMG/GAME1.png"
];
let filaInferiorIzquierda = [
    "../IMG/GAME100.png"
];
let filaInferiorDerecha = [
    "../IMG/GAME100.png"
];

const mazoCartas = [];

for (let i = 2; i <= 99; i++) {
    mazoCartas.push(`../IMG/GAME${i}.png`);
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
    for (let i = 0; i < manoCartas.length; i++) {
        const idCarta = `MANO${i + 1}`;
        const imageDisplay = document.getElementById(idCarta);

        if (imageDisplay) {
            imageDisplay.src = manoCartas[i];
        }
    }
}

// Llama a la función para mostrar las cartas en la mano
mostrarCartasEnMano();

const currentSuperiorIzquierda = filaSuperiorIzquierda.length - 1; // El índice de la imagen actual, inicializado en la última imagen de la lista.
const currentSuperiorDerecha = filaSuperiorDerecha.length - 1;
const currentInferiorIzquierda = filaInferiorIzquierda.length - 1;
const currentInferiorDerecha = filaInferiorDerecha.length - 1;

const imageDisplaySuperiorIzquierda = document.getElementById("GAME1Izquierda"); // Obtiene el elemento de imagen por su ID.
const imageDisplaySuperiorDerecha = document.getElementById("GAME1Derecha");
const imageDisplayInferiorIzquierda = document.getElementById("GAME100Izquierda");
const imageDisplayInferiorDerecha = document.getElementById("GAME100Derecha");

const imageDisplayMano1 = document.getElementById("MANO1");
const imageDisplayMano2 = document.getElementById("MANO2");
const imageDisplayMano3 = document.getElementById("MANO3");
const imageDisplayMano4 = document.getElementById("MANO4");
const imageDisplayMano5 = document.getElementById("MANO5");
const imageDisplayMano6 = document.getElementById("MANO6");
const imageDisplayMano7 = document.getElementById("MANO7");
const imageDisplayMano8 = document.getElementById("MANO8");

// Función que muestra la imagen actual en el elemento de imagen.
function displayCurrentImage() {
    //SuperiorIzquierda
    if (currentSuperiorIzquierda >= 0 && currentSuperiorIzquierda < filaSuperiorIzquierda.length) {
        imageDisplaySuperiorIzquierda.src = filaSuperiorIzquierda[currentSuperiorIzquierda];
    } else {
        imageDisplaySuperiorIzquierda.src = ""; // Si currentIndex está fuera del rango, muestra una imagen vacía.
    }
    //SuperiorDerecha
    if (currentSuperiorDerecha >= 0 && currentSuperiorDerecha < filaSuperiorDerecha.length) {
        imageDisplaySuperiorDerecha.src = filaSuperiorDerecha[currentSuperiorDerecha];
    } else {
        imageDisplaySuperiorDerecha.src = ""; // Si currentIndex está fuera del rango, muestra una imagen vacía.
    }
    //InferiorIZquierda
    if (currentInferiorIzquierda >= 0 && currentInferiorIzquierda < filaInferiorIzquierda.length) {
        imageDisplayInferiorIzquierda.src = filaInferiorIzquierda[currentInferiorIzquierda];
    } else {
        imageDisplayInferiorIzquierda.src = ""; // Si currentIndex está fuera del rango, muestra una imagen vacía.
    }
    //InferiorDerecha
    if (currentInferiorDerecha >= 0 && currentInferiorDerecha < filaInferiorDerecha.length) {
        imageDisplayInferiorDerecha.src = filaInferiorDerecha[currentInferiorDerecha];
    } else {
        imageDisplayInferiorDerecha.src = ""; // Si currentIndex está fuera del rango, muestra una imagen vacía.
    }
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


let draggedElement = null;

function dragStart(event) {
    draggedElement = event.target;
    // Establece el efecto de arrastre
    event.dataTransfer.effectAllowed = "move";
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
    handleCardDrop(draggedElement, event.target);
}

function handleCardDrop(draggedCard, targetElement) {

    //TODAS LAS CARTAS PARA GAME1Derecha
    if (draggedCard.id === "GAME100Derecha" && targetElement.id === "GAME1Derecha"){
        const ultimoValor = filaInferiorDerecha[filaInferiorDerecha.length - 1];
        filaSuperiorDerecha.push(ultimoValor);
        filaInferiorDerecha.pop();
        let miImagen1 = document.getElementById("GAME1Derecha");
        let miImagen2 = document.getElementById("GAME100Derecha");
        miImagen1.src = filaSuperiorDerecha[filaSuperiorDerecha.length - 1];
        miImagen2.src = filaInferiorDerecha[filaInferiorDerecha.length - 1];
    } else if (draggedCard.id === "MANO8" && targetElement.id === "GAME1Derecha"){
        const valor8 = manoCartas[manoCartas.length - 1];
        filaSuperiorDerecha.push(valor8);
        manoCartas.pop();
        let miImagen1 = document.getElementById("GAME1Derecha");
        let miImagen2 = document.getElementById("MANO8");
        miImagen1.src = filaSuperiorDerecha[filaSuperiorDerecha.length - 1];
        miImagen2.src = "../IMG/GAMEBACK.png";
        manoCartas.push("../IMG/GAMEBACK.png");
        mostrarCartasEnMano()
    } else if (draggedCard.id === "MANO7" && targetElement.id === "GAME1Derecha") {
        const valor7 = manoCartas[manoCartas.length - 2];
        filaSuperiorDerecha.push(valor7);
        var posicionAEliminar = manoCartas.length - 2;
        manoCartas.splice(posicionAEliminar, 1);
        let miImagen1 = document.getElementById("GAME1Derecha");

        miImagen1.src = filaSuperiorDerecha[filaSuperiorDerecha.length - 1];
        var indiceMano7 = manoCartas.length - 1;
        manoCartas.splice(indiceMano7, 0,"../IMG/GAMEBACK.png");
        mostrarCartasEnMano()

    }





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





