const filaSuperiorIzquierda = [
    "../IMG/GAME1.png"
]; // Una matriz que almacena las rutas de las imágenes en la carpeta "IMG".

const currentSuperiorIzquierda = filaSuperiorIzquierda.length - 1; // El índice de la imagen actual, inicializado en la última imagen de la lista.

const imageDisplay = document.getElementById("GAME1Izquierda"); // Obtiene el elemento de imagen por su ID.

// Función que muestra la imagen actual en el elemento de imagen.
function displayCurrentImage() {
    if (currentSuperiorIzquierda >= 0 && currentSuperiorIzquierda < filaSuperiorIzquierda.length) {
        imageDisplay.src = filaSuperiorIzquierda[currentSuperiorIzquierda];
    } else {
        imageDisplay.src = ""; // Si currentIndex está fuera del rango, muestra una imagen vacía.
    }
}

displayCurrentImage(); // Llama a la función para mostrar la imagen actual en la carga inicial.

