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

// Función para desplazarse suavemente a una sección
function scrollToSection(seccion) {
    const offset = seccion.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: offset,
        behavior: "smooth"
    });
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

const items = document.querySelectorAll(".accordion-item");
items.forEach((item) => {
    item.addEventListener("click", () => {
        items.forEach(item => {
            item.classList.remove("item-active");
        });
        item.classList.add("item-active");
    });
});

//ANTERIOR

document.addEventListener("DOMContentLoaded", function() {
    const verReglasButton = document.getElementById("verReglas");
    const jugarNuevaPartidaButton = document.getElementById("jugarNuevaPartida");
    const jugarNuevaPartidaExtremoButton = document.getElementById("jugarNuevaPartidaExtremo");
    const jugarConSeedButton = document.getElementById("jugarConSeed");


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


