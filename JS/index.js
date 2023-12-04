gsap.registerPlugin(ScrollTrigger, ScrollSmoother)


// Obtener los elementos del DOM
const checkbox = document.getElementById('check-5');
const volumeControl = document.getElementById('volumeControl');
const backgroundMusic = document.getElementById('audioFondoHome');

// Guardar el volumen inicial
let initialVolume = 0.5; // Volumen inicial, en este caso, 50%

// Función para reproducir o detener la música de fondo según el estado del checkbox
checkbox.addEventListener('change', function() {
    if (this.checked) {
        backgroundMusic.play();
        // Si el checkbox está marcado, establecer el volumen al valor guardado inicialmente
        backgroundMusic.volume = initialVolume;
    } else {
        backgroundMusic.pause();
    }
});

// Función para ajustar el volumen de la música según el valor del rango de volumen
volumeControl.addEventListener('input', function() {
    const volumeValue = parseFloat(this.value) / 100;
    backgroundMusic.volume = volumeValue;

    // Si el checkbox está marcado, actualiza el valor inicial del volumen
    if (checkbox.checked) {
        initialVolume = volumeValue;
    }
});


if (ScrollTrigger.isTouch !== 1) {

    ScrollSmoother.create({
        wrapper: '.wrapper',
        content: '.content',
        smooth: 1.5,
        effects: true
    })

    gsap.fromTo('.hero-section', { opacity: 1 }, {
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'center',
            end: '820',
            scrub: true
        }
    })

    let itemsL = gsap.utils.toArray('.gallery__left .gallery__item')

    itemsL.forEach(item => {
        gsap.fromTo(item, { opacity: 0, x: -50 }, {
            opacity: 1, x: 0,
            scrollTrigger: {
                trigger: item,
                start: '-850',
                end: '-100',
                scrub: true
            }
        })
    })

    let itemsR = gsap.utils.toArray('.gallery__right .gallery__item')

    itemsR.forEach(item => {
        gsap.fromTo(item, { opacity: 0, x: 50 }, {
            opacity: 1, x: 0,
            scrollTrigger: {
                trigger: item,
                start: '-750',
                end: 'top',
                scrub: true
            }
        })
    })

}

// Obtén los botones y las secciones de destino por su ID
const botones = document.querySelectorAll(".btnNav");
const seccionesDestino = [
    document.getElementById("seccionDestino1"),
    document.getElementById("seccionDestino2"),
    document.getElementById("seccionDestino3"),
    document.getElementById("seccionDestino4"),
    document.getElementById("seccionDestino5"),
    document.getElementById("seccionDestino6")
];

function scrollToSection(seccion) {
    if (seccion) {
        const seccionRect = seccion.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calcula la posición centrada restando la mitad de la altura de la ventana menos la mitad de la altura de la sección
        const scrollToY = seccionRect.top + window.scrollY - (windowHeight / 2 - seccionRect.height / 2);

        window.scrollTo({
            top: scrollToY,
            behavior: "smooth"
        });
    } else {
        console.error("La sección de destino no está definida.");
    }
}

botones.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        scrollToSection(seccionesDestino[index]);

        /*
        //Poder cambiar la clase

        botones.forEach((btn) => {
            btn.classList.remove("activo");
        });
        boton.classList.add("activo");
        */

    });
});

// Obtén el botón y la sección de destino por su ID
const botonJugar = document.getElementById("botonIrASeccionZ");
const botonJugarE = document.getElementById("botonIrASeccionE");
const seccionJugar = document.getElementById("seccionDestino2");
const seccionJugarE = document.getElementById("seccionDestino6");

// Agrega un evento al botón para desplazarse suavemente a la sección 2 al hacer clic
botonJugar.addEventListener("click", () => {
    if (seccionJugar) {
        const seccionRect = seccionJugar.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calcula la posición centrada restando la mitad de la altura de la ventana menos la mitad de la altura de la sección
        const scrollToY = seccionRect.top + window.scrollY - (windowHeight / 2 - seccionRect.height / 2);

        window.scrollTo({
            top: scrollToY,
            behavior: "smooth"
        });
    } else {
        console.error("La sección de destino no está definida.");
    }
});
botonJugarE.addEventListener("click", () => {
    if (seccionJugarE) {
        const seccionRect = seccionJugarE.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calcula la posición centrada restando la mitad de la altura de la ventana menos la mitad de la altura de la sección
        const scrollToY = seccionRect.top + window.scrollY - (windowHeight / 2 - seccionRect.height / 2);

        window.scrollTo({
            top: scrollToY,
            behavior: "smooth"
        });

    } else {
        console.error("La sección de destino no está definida.");
    }
});
const items = document.querySelectorAll(".accordion-item");
const botonesIrASeccion = document.querySelectorAll(".extremobtn");

items.forEach((item) => {
    item.addEventListener("click", () => {
        items.forEach(item => {
            item.classList.remove("item-active");
        });
        item.classList.add("item-active");
    });
});

botonesIrASeccion.forEach((boton) => {
    boton.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el evento se propague al acordeón

        const acordeonEspecifico = document.querySelector(".accordion-item.itemz");

        items.forEach(item => {
            item.classList.remove("item-active");
        });

        acordeonEspecifico.classList.add("item-active");
    });
});

botonIrASeccionE.addEventListener("click", () => {
    const acordeonEspecifico = document.querySelector(".accordion-item.itemz");

    items.forEach(item => {
        item.classList.remove("item-active");
    });

    acordeonEspecifico.classList.add("item-active");
});

//ANTERIOR

document.addEventListener("DOMContentLoaded", function() {
    const verReglasButton = document.getElementById("verReglas");
    const jugarNuevaPartidaButton = document.getElementById("jugarNuevaPartida");
    const jugarNuevaPartidaExtremoButton = document.getElementById("jugarNuevaPartidaExtremo");
    const jugarConSeedButton = document.getElementById("jugarConSeed");
    const jugarConSeedButtonExtremo = document.getElementById("jugarConSeedExtremo");


    verReglasButton.addEventListener("click", function() {
        Swal.fire({
            title: 'REGLAS THE GAME',
            imageUrl: '../IMG/rules.png',
            imageAlt: 'RULES'
        })
    });

    jugarNuevaPartidaExtremoButton.addEventListener("click", function() {
        Swal.fire({
            title: "Ingrese su intento de Nombre",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                maxlength: 4
            },
            showCancelButton: true,
            confirmButtonText: "Intentarlo",
            cancelButtonText: "Mejor no!",
            showLoaderOnConfirm: true,
            preConfirm: (nombre) => {
                return new Promise((resolve) => {
                    if (nombre.trim() === "") {
                        Swal.showValidationMessage("Por favor, ingresa por lo menos 1 letra! pero mas de 4 no:)");
                    } else {
                        resolve(nombre);
                    }
                    if (nombre.length > 4) {
                        Swal.showValidationMessage("Ingrese un nombre de máximo 4 caracteres.");
                    } else {
                        resolve(nombre);
                    }
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const nombre = result.value;
                localStorage.setItem("nombre", nombre); // Guarda el nombre en localStorage
                window.location.href = "thegameDificil.html"; // Redirige a "thegame.html"
            }
        });
    });

    jugarNuevaPartidaButton.addEventListener("click", function() {
        Swal.fire({
            title: "Ingrese su Nombre",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                maxlength: 4
            },
            showCancelButton: true,
            confirmButtonText: "Jugar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: (nombre) => {
                return new Promise((resolve) => {
                    if (nombre.trim() === "") {
                        Swal.showValidationMessage("Por favor, ingrese un nombre válido.");
                    }
                    resolve(nombre);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const nombre = result.value;
                localStorage.setItem("nombre", nombre); // Guarda el nombre en localStorage
                window.location.href = "thegame.html"; // Redirige a "thegame.html"
            }
        });
    });

    jugarConSeedButton.addEventListener("click", function() {
        Swal.fire({
            title: "Ingrese Nombre y Seed",
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre" maxlength="4">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Seed">',
            preConfirm: () => {
                const nombre = document.getElementById("swal-input1").value.trim();
                const seed = document.getElementById("swal-input2").value.trim();
                if (nombre === "" || seed === "") {
                    Swal.showValidationMessage("Por favor, complete ambos campos.");
                    return false;
                } else if (nombre.length > 4) {
                    Swal.showValidationMessage("Ingrese un nombre de máximo 4 caracteres.");
                    return false;
                }
                return { nombre, seed };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nombre, seed } = result.value;
                localStorage.setItem("nombre", nombre); // Guarda el nombre en localStorage
                localStorage.setItem("seed", seed); // Guarda la seed en localStorage
                window.location.href = "thegame.html"; // Redirige a "thegame.html"
            }
        });

    });

    jugarConSeedButtonExtremo.addEventListener("click", function() {
        Swal.fire({
            title: "Ingrese intento de Nombre y Seed",
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre" maxlength="4">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Seed">',
            preConfirm: () => {
                const nombre = document.getElementById("swal-input1").value.trim();
                const seed = document.getElementById("swal-input2").value.trim();
                if (nombre === "" || seed === "") {
                    Swal.showValidationMessage("Por favor, complete ambos campos.");
                    return false;
                } else if (nombre.length > 4) {
                    Swal.showValidationMessage("Ingrese un nombre de máximo 4 caracteres.");
                    return false;
                }
                return { nombre, seed };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nombre, seed } = result.value;
                localStorage.setItem("nombre", nombre); // Guarda el nombre en localStorage
                localStorage.setItem("seed", seed); // Guarda la seed en localStorage
                window.location.href = "thegameDificil.html"; // Redirige a "thegame.html"
            }
        });

    });

    const juegoPendiente = localStorage.getItem("juegoPendiente");
    const cuadroJuegoPendiente = document.getElementById("cuadroJuegoPendiente");
    const juegoNoPendiente = document.getElementById("noPendiente");
    const juegoNoPendiente1 = document.getElementById("noPendiente1");
    const nombreJuego = document.getElementById("nombreJuego");
    const seedJuego = document.getElementById("seedJuego");
    const porcentajeJuego = document.getElementById("porcentajeJuego");
    const barraPorcentaje = document.getElementById("barraPorcentaje");

    if (juegoPendiente) {

        if (cuadroJuegoPendiente) {
            cuadroJuegoPendiente.style.display = "block";
            juegoNoPendiente.style.display = "none";
            juegoNoPendiente1.textContent = "Partida Pendiente!";


            // Obtener datos del juego pendiente desde localStorage
            const nombre = localStorage.getItem("nombre");
            const seed = localStorage.getItem("seed");
            const mazoCartas = JSON.parse(localStorage.getItem("mazoCartas"));
            const porcentaje = 100 - (mazoCartas.length / 100) * 100;

            // Mostrar información del juego pendiente en el HTML
            nombreJuego.textContent = nombre;
            seedJuego.textContent = seed;
            porcentajeJuego.textContent = porcentaje;
            barraPorcentaje.style.width = porcentaje + "%";
        }
    }

    const verJuegoPendienteButton = document.getElementById("verJuegoPendiente");
    if (verJuegoPendienteButton) {
        verJuegoPendienteButton.addEventListener("click", function() {
            // Obtén los datos del juego pendiente desde localStorage
            const nombre = localStorage.getItem("nombre");
            const seed = localStorage.getItem("seed");

            // Calcula el porcentaje de la partida (ejemplo: utilizando el array "mazoCartas" con 100 cartas)
            const mazoCartas = JSON.parse(localStorage.getItem("mazoCartas"));
            const porcentaje = 100 - (mazoCartas.length / 100) * 100;



            // Muestra la alerta con los datos del juego pendiente y botones "Continuar" y "Cancelar"
            Swal.fire({
                title: "Detalles del Juego Pendiente",
                html: `
        <div class="custom-alert">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Seed:</strong> ${seed}</p>
            <p><strong>Porcentaje de la partida:</strong> ${porcentaje}%</p>
        </div>`,
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Continuar",
                cancelButtonText: "Cancelar",
                customClass: {
                    confirmButton: "custom-confirm-button",
                    cancelButton: "custom-cancel-button"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem("continueFunction", "true");
                    window.location.href = "thegame.html";
                }
            });

        });
    }

});

document.getElementById('btnScore').addEventListener('click', function() {
    document.getElementById('modal-overlay').style.display = 'block';
});
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal-overlay').style.display = 'none';
});


// Función para detectar si está en localhost y la condición de partidaPendiente
function checkConditions() {;
    const juegoPendiente = localStorage.getItem("juegoPendiente");
    if (juegoPendiente) {
        const partidaPendienteButton = document.getElementById('botonIrASeccion6');
        partidaPendienteButton.classList.add('blink-shadow');
    }
}


window.onload = checkConditions;


document.addEventListener('DOMContentLoaded', function() {
    var botonCopia = document.querySelector('.copy');
    var seedElement = document.getElementById('seedJuego');

    botonCopia.addEventListener('click', function() {
        var seed = seedElement.innerText;

        // Utilizar el nuevo API de Clipboard para copiar el texto al portapapeles
        navigator.clipboard.writeText(seed)
            .then(function() {
            })
            .catch(function(err) {
                // Manejar errores si la copia falla
                console.error('Error al copiar al portapapeles: ', err);
            });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var deleteButton = document.getElementById('eliminarLocal');

    deleteButton.addEventListener('click', function() {
        var claveAMantener = 'firebase:host:thegamevd-default-rtdb.firebaseio.com';

        // Obtener todas las claves del LocalStorage
        var keys = Object.keys(localStorage);

        // Iterar sobre las claves y eliminar aquellas que no son la que deseas mantener
        keys.forEach(function(key) {
            if (key !== claveAMantener) {
                localStorage.removeItem(key);
            }
        });
        Swal.fire({
            title: 'Se elimino la partida pendiente',
            didClose: function() {
                // Recargar la página después de cerrar el mensaje
                location.reload();
            }
        })
    });
});


const reglasExtremo = document.getElementById("reglasExtremo");
reglasExtremo.addEventListener("click", () => {
    Swal.fire({
        title: 'Reglas de "The Game"',
        html: `
        <strong>Objetivo del Juego: <br> 
        <h4 class="alertWhite" > 
        Colocar las cartas numéricas en cuatro filas, dos ascendentes (1-99) y dos descendentes (100-2), cumpliendo con las reglas de cada fila.
        </h4>
        </strong>
        
        <br><br>
        <strong>Preparación:</strong> 
        <h4 class="alertWhite" >
        Coloca las cuatro filas de cartas boca arriba en el centro de la mesa.
Mezcla las 98 cartas numéricas.
Para 3-5 jugadores: reparte 6 cartas a cada jugador (7 para 2 jugadores).
Para 1 jugador: reparte 8 cartas.
Forma una pila de robo con las cartas restantes, boca abajo.
</h4>
        <br><br>
        <strong>Cómo Jugar:</strong> Los jugadores deciden quién empieza.
Por turnos en el sentido de las agujas del reloj, cada jugador coloca al menos dos cartas de su mano a la derecha de cualquier fila.
Puedes colocar más cartas si es posible, siguiendo las reglas de cada fila.
Luego, roba el mismo número de cartas de la pila de robo.
Continúa el juego hasta que la pila de robo se vacíe.
        <br><br>
        <strong>Reglas de Colocación:</strong> Fila Ascendente: Coloca cartas en orden creciente, permitiendo cualquier espacio entre ellas.
Fila Descendente: Coloca cartas en orden decreciente.
Aumento del Montón
Cuando una carta es exactamente 10 mayor o menor que la carta superior de un montón, se puede jugar en orden inverso.
Esta regla se puede aplicar varias veces durante un turno.
Comunicación
No se puede revelar el número exacto de cartas en la mano, pero otras comunicaciones están permitidas.
        <strong>Fin del Juego:</strong> Continúa jugando sin robar cuando la pila se vacíe.
Si un jugador no puede jugar el número mínimo de cartas en su turno, el juego termina.
Se cuentan las cartas restantes en manos y en la pila. Menos de 10 cartas es un resultado excelente.
Si se juegan todas las cartas, ¡has ganado!
        <br><br>
        <strong>Nivel Expertos:</strong> En partidas expertas, se deben colocar al menos 3 cartas por turno.
Ajusta el número de cartas repartidas según el número de jugadores.
      `,
        confirmButtonText: 'Entendido'
    });
});



// Función para mostrar las reglas en SweetAlert2
function mostrarReglas() {
    Swal.fire({
        title: 'Reglas de "The Game"',
        html: `
        <strong>Objetivo del Juego:</strong> <h4 class="alertWhite" > Colocar cartas numéricas en filas ascendentes y descendentes. </h4>
        <img src="../IMG/home/tablero.png" width="40%" >
        <br><br>
        <strong>Preparación:</strong>
    <div class="alertWhite">
    Preparate para pensar muy bien cada movimiento:<br>
      <div style="display: flex; align-items: center;">
        <div style="flex: 1;">
          <h2>ComenzarJuego:</h2><br>
         Una vez comenzado el juego la partida estara lista para ser guardada, asi que logra tu maxima puntiación!
        </div>
        <div style="flex: 1; text-align: right;">
          <img src="../IMG/home/comenzarPicture.png" width="100%" >
        </div>
      </div>
    </div>
    <br><br>
        <strong>Cómo Jugar:</strong>
         <h4 class="alertWhite" >
       Una vez comenzado el juego tu tablero sera mostrado y deberas tomar tus primeras 8 cartas:
       <img src="../IMG/home/turnobtnRule.png" width="100%" > <br>
       Podras arrastrar tus cartas hacia el tablero:
        </h4>
        <br><br>
        <strong>Reglas de Colocación:</strong>
         <h4 class="alertWhite" >
        Fila Ascendente: Coloca cartas en orden creciente, permitiendo cualquier espacio entre ellas.
        Fila Descendente: Coloca cartas en orden decreciente.
        Aumento del Montón
        Cuando una carta es exactamente 10 mayor o menor que la carta superior de un montón, se puede jugar en orden inverso.
        Esta regla se puede aplicar varias veces durante un turno.
        Comunicación
        No se puede revelar el número exacto de cartas en la mano, pero otras comunicaciones están permitidas.
        </h4>
        <br><br>
        <strong>Fin del Juego:</strong>
         <h4 class="alertWhite" >
        Continúa jugando sin robar cuando la pila se vacíe.
        Si un jugador no puede jugar el número mínimo de cartas en su turno, el juego termina.
        Se cuentan las cartas restantes en manos y en la pila. Menos de 10 cartas es un resultado excelente.
        Si se juegan todas las cartas, ¡has ganado!
        </h4>
        <br><br>
        <strong>Nivel Expertos:</strong>
         <h4 class="alertWhite" >
        En partidas expertas, se deben colocar al menos 3 cartas por turno.
        Ajusta el número de cartas repartidas según el número de jugadores.
        </h4>
      `,
        confirmButtonText: 'Entendido',
    });
}

// Llamar a la función para mostrar las reglas al cargar la página (opcional)
window.onload = function() {
    mostrarReglas();
};
window.onload = checkConditions;