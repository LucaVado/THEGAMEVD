const filaSuperiorIzquierda = [
    "../IMG/GAME1.png"
]; // Una matriz que almacena las rutas de las imágenes en la carpeta "IMG".
const filaSuperiorDerecha = [
    "../IMG/GAME1.png"
];
const filaInferiorIzquierda = [
    "../IMG/GAME100.png"
];
const filaInferiorDerecha = [
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

