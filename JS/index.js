document.addEventListener("DOMContentLoaded", function() {
    const verReglasButton = document.getElementById("verReglas");
    const jugarNuevaPartidaButton = document.getElementById("jugarNuevaPartida");
    const jugarConSeedButton = document.getElementById("jugarConSeed");

    verReglasButton.addEventListener("click", function() {
        Swal.fire({
            title: "Reglas del Juego",
            text: "Aquí van las reglas del juego.",
            icon: "info"
        });
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
                // Lógica para jugar la nueva partida con el nombre ingresado
                alert("Comenzando nueva partida para: " + nombre);
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
                // Lógica para jugar con la Seed y el nombre
                alert("Comenzando partida para: " + nombre + " con la Seed: " + seed);
            }
        });
    });
});
