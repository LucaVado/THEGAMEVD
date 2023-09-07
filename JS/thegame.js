

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

    if (draggedCard.id === "GAME100Derecha" && targetElement.id === "GAME1Derecha"){
        const ultimoValor = filaInferiorDerecha[filaInferiorDerecha.length - 1];
        filaSuperiorDerecha.push(ultimoValor);
        filaInferiorDerecha.pop();
        let miImagen1 = document.getElementById("GAME1Derecha");
        let miImagen2 = document.getElementById("GAME100Derecha");
        miImagen1.src = filaSuperiorDerecha[filaSuperiorDerecha.length - 1];
        miImagen2.src = filaInferiorDerecha[filaInferiorDerecha.length - 1];
    }




}


// Agrega un manejador de eventos para el inicio de arrastre
imageDisplaySuperiorIzquierda.addEventListener("dragstart", dragStart);
imageDisplaySuperiorDerecha.addEventListener("dragstart", dragStart);
imageDisplayInferiorIzquierda.addEventListener("dragstart", dragStart);
imageDisplayInferiorDerecha.addEventListener("dragstart", dragStart);

// Agrega un manejador de eventos para la finalización del arrastre
imageDisplaySuperiorIzquierda.addEventListener("dragend", dragEnd);
imageDisplaySuperiorDerecha.addEventListener("dragend", dragEnd);
imageDisplayInferiorIzquierda.addEventListener("dragend", dragEnd);
imageDisplayInferiorDerecha.addEventListener("dragend", dragEnd);

// Agrega un manejador de eventos para el objetivo de soltar
imageDisplaySuperiorIzquierda.addEventListener("dragover", dragOver);
imageDisplaySuperiorDerecha.addEventListener("dragover", dragOver);
imageDisplayInferiorIzquierda.addEventListener("dragover", dragOver);
imageDisplayInferiorDerecha.addEventListener("dragover", dragOver);

// Agrega un manejador de eventos para el soltar
imageDisplaySuperiorIzquierda.addEventListener("drop", drop);
imageDisplaySuperiorDerecha.addEventListener("drop", drop);
imageDisplayInferiorIzquierda.addEventListener("drop", drop);
imageDisplayInferiorDerecha.addEventListener("drop", drop);





