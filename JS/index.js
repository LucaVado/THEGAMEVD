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


const btnScore = document.getElementById("btnScore");
const modal = document.getElementById("myModal");


btnScore.addEventListener("click", function() {
    modal.style.display = "block";
});


const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});


window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


const svg = `
<svg version="1.1" height="96" width="96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <style>
  use { fill: red; animation: .4s infinite ease, color 1s infinite linear alternate;}
  @keyframes color {to {fill: green}}
  @keyframes left {to {transform: translate(-32px, 0)}}
  @keyframes down {to {transform: translate(0, 32px)}}
  @keyframes right {to {transform: translate(32px, 0)}}
  @keyframes up {to {transform: translate(0, -32px)}}
 </style>
 <defs>
  <path id="skull" d="m16.779 11.591c-0.344 0.085-0.515-0.296-0.541-0.610-0.063-0.740 0.076-1.182 0.008-1.576-0.076-0.447 0.192-1.170-0.420-0.931-0.348 0.136-0.059 0.488 0.067 0.857 0.125 0.370 0.093 1.615 0.093 1.877 0.000 0.455 0.282 0.722 1.033 0.967 0.864 0.282 0.176 2.121-0.657 2.332-0.866 0.219-1.352-0.324-1.972-0.227-1.095 0.171-0.876 1.138-1.095 1.451-0.219 0.313-0.219 0.313-0.594 0.654-0.276 0.251-0.457 0.452-0.650 0.611 0.030 0.024 0.052 0.065 0.057 0.134 0.024 0.299 0.288 0.528 0.288 0.827 0.000 0.299-0.105 0.405-0.527 0.490-0.422 0.086-0.608-0.064-0.632-0.191-0.023-0.128 0.035-0.595 0.103-0.844 0.022-0.082 0.053-0.132 0.086-0.166-0.343 0.056-0.771 0.078-1.071 0.078-0.011 0.000-0.022 0.000 -0.033 0.000 0.073 0.044 0.152 0.120 0.201 0.256 0.119 0.324 0.137 0.569 0.161 0.761 0.023 0.192-0.258 0.256-0.540 0.277-0.282 0.021-0.610-0.064-0.657-0.171-0.047-0.106 0.031-0.551 0.079-0.781 0.029-0.140 0.186-0.261 0.307-0.336-0.317 0.006-0.655 0.017-1.000 0.022 0.092 0.090 0.182 0.200 0.204 0.306 0.048 0.231 0.152 0.576 0.129 0.725-0.024 0.149-0.094 0.192-0.540 0.214-0.446 0.021-0.596-0.043-0.643-0.128-0.047-0.086 0.034-0.597 0.090-0.808 0.030-0.113 0.123-0.224 0.208-0.307-0.278-0.003-0.556-0.013-0.825-0.033 0.066 0.167 0.368 0.453 0.288 0.913-0.045 0.256-0.177 0.363-0.785 0.364-0.352 0.001 -0.515-0.214-0.516-0.363-0.002-0.409 0.188-0.694 0.288-0.987-0.338-0.035-0.543-0.060-0.710-0.123 0.023 0.138 0.114 0.502 0.163 0.875 0.031 0.234-0.094 0.363-0.399 0.363-0.305 0.000-0.493-0.149-0.493-0.277 0.000-0.341 0.552-0.976 0.597-1.003 0.005-0.003 0.010-0.007 0.015-0.011-0.032-0.018-0.064-0.037-0.096-0.060-0.282-0.199-0.626-0.482-0.809-1.204-0.183-0.722-0.118-1.162-0.729-1.495-0.611-0.333-1.712 0.464-2.262 0.412-0.612-0.058-1.387-1.172-1.436-1.697-0.058-0.613 0.600-0.329 0.974-1.105 0.238-0.494 0.001-1.112 0.001-2.500 0.000-1.388 0.525-2.095 0.857-2.776 0.241-0.496-0.093-0.864 0.332-2.160 0.364-1.106 0.691-1.518 0.691-1.518s-0.586 0.438-0.929 1.470c-0.305 0.914-0.212 1.374-0.456 2.096-0.244 0.722-0.614 1.197-0.797 2.307-0.183 1.110 0.124 2.464-0.183 2.913-0.207 0.302-0.893-0.024-0.982-1.139-0.077-0.956-0.213-2.846-0.030-3.956 0.183-1.110 0.291-0.698 0.937-2.739 0.761-2.406 4.081-3.871 8.044-3.920 3.462-0.043 4.728 0.977 5.859 1.948 1.180 1.013 2.003 2.430 2.253 3.340 0.250 0.910 0.469 1.288 0.626 2.056 0.157 0.768 0.072 1.883-0.080 2.438-0.170 0.617-0.503 1.696-0.952 1.808zm-9.499-2.444c-0.446-0.640-1.644-0.751-2.558-0.789-1.009-0.043-1.562 0.240-1.666 0.939-0.085 0.564 0.023 1.408 0.235 2.026 0.184 0.538 0.915 1.259 1.549 1.173 0.509-0.069 1.595-0.808 2.230-1.472 0.379-0.397 0.426-1.569 0.211-1.877zm1.408 1.728c-0.235 0.015-0.587 0.725-0.751 1.621-0.108 0.590-0.539 1.415-0.446 1.920 0.062 0.339 0.409 0.388 0.610 0.021 0.164-0.298 0.258-0.576 0.493-0.576 0.235 0.000 0.753 1.250 1.056 1.216 0.350-0.039 0.782-0.533 0.728-1.152-0.047-0.533-0.282-1.067-0.634-1.621-0.352-0.555-0.823-1.444-1.056-1.429zm5.703-1.728c-0.352-0.427-0.962-0.789-2.159-0.725-0.990 0.053-1.976 0.416-2.065 1.024-0.093 0.640 0.106 0.974 0.493 1.408 0.399 0.448 1.525 1.323 2.252 1.365 0.728 0.043 1.361-0.107 1.455-0.768 0.094-0.661 0.375-1.877 0.023-2.304zm-1.619 10.389c0.563-0.512 0.470-1.387 0.704-2.496 0.234-1.109 0.657-1.451 0.938-1.834 0.282-0.384 0.954-0.332 1.033-0.171 0.094 0.192-0.193 1.487-0.469 2.325-0.422 1.280-0.446 1.792-0.469 2.453-0.020 0.565-1.009 1.003-1.525 1.451-0.517 0.448-0.986 1.280-1.619 1.451-0.634 0.171-1.526-0.128-2.488-0.107-0.962 0.021-1.924 0.235-2.441 0.064-0.516-0.170-1.103-0.960-1.760-1.493-0.657-0.534-1.432-0.854-1.666-1.365-0.235-0.512 0.000-1.131-0.047-1.920-0.047-0.789-0.282-1.280-0.516-1.749-0.235-0.469-0.079-0.808 0.305-0.938 0.563-0.192 0.962 0.235 1.244 1.045 0.294 0.846 0.555 1.343 0.610 2.048 0.070 0.896 0.211 1.066 0.540 1.386 0.187 0.183 0.532 0.292 0.895 0.383-0.067-0.160-0.127-0.368-0.097-0.746 0.015-0.192 0.188-0.256 0.563-0.277 0.376-0.021 0.624 0.064 0.634 0.235 0.032 0.563-0.119 0.803-0.227 0.992 0.202 0.028 0.500 0.045 0.843 0.054-0.127-0.232-0.262-0.499-0.263-0.940-0.001 -0.253 0.211-0.213 0.563-0.234 0.352-0.021 0.714-0.025 0.727 0.192 0.027 0.439-0.138 0.724-0.288 0.992 0.253 0.000 0.510-0.002 0.757-0.005-0.103-0.289-0.193-0.662-0.140-0.987 0.021-0.129 0.329-0.171 0.611-0.192 0.281-0.021 0.624 0.105 0.634 0.256 0.021 0.333-0.090 0.655-0.217 0.907 0.169-0.004 0.316-0.008 0.427-0.011 0.106-0.003 0.213-0.010 0.320-0.020-0.121-0.208-0.239-0.470-0.225-0.683 0.010-0.172 0.422-0.534 0.751-0.512 0.262 0.017 0.542 0.068 0.557 0.196 0.031 0.270-0.062 0.563-0.177 0.808 0.368-0.125 0.708-0.308 0.981-0.556z" />
 </defs>
 <use href="#skull" x="0" y="0"  style="animation-name: down, color"/>
 <use href="#skull" x="32" y="0" style="animation-name: left, color"/>
 <use href="#skull" x="64" y="0" style="animation-name: left, color"/>
 <use href="#skull" x="0" y="32" style="animation-name: down, color"/>
 <use href="#skull" x="0" y="64" style="animation-name: right, color"/>
 <use href="#skull" x="32" y="64" style="animation-name: right, color"/>
 <use href="#skull" x="64" y="64" style="animation-name: up, color"/>
 <use href="#skull" x="64" y="32" style="animation-name: up, color"/>
</svg>
`;

const blob = new Blob([svg], {type: 'image/svg+xml'})
const svgUrl = URL.createObjectURL(blob);
document.querySelector('.skulls').style.borderImageSource = `url(${svgUrl})`;
