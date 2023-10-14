document.addEventListener("DOMContentLoaded", function() {
    const verReglasButton = document.getElementById("verReglas");
    const jugarNuevaPartidaButton = document.getElementById("jugarNuevaPartida");
    const jugarConSeedButton = document.getElementById("jugarConSeed");


    verReglasButton.addEventListener("click", function() {
        Swal.fire({
            title: 'REGLAS THE GAME',
            imageUrl: '../IMG/rules.png',
            imageAlt: 'RULES'
        })
    });

    jugarNuevaPartidaButton.addEventListener("click", function() {
        Swal.fire({
            title: "Ingrese su Nombre",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
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
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Seed">',
            preConfirm: () => {
                const nombre = document.getElementById("swal-input1").value.trim();
                const seed = document.getElementById("swal-input2").value.trim();
                if (nombre === "" || seed === "") {
                    Swal.showValidationMessage("Por favor, complete ambos campos.");
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

    if (juegoPendiente) {
        const cuadroJuegoPendiente = document.getElementById("cuadroJuegoPendiente");
        if (cuadroJuegoPendiente) {
            cuadroJuegoPendiente.style.display = "block";
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
