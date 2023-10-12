document.addEventListener("DOMContentLoaded", function () {
    const startGameButton = document.getElementById("startGame");

    startGameButton.addEventListener("click", function () {
        const playerName = document.getElementById("playerName").value;
        const seed = document.getElementById("seed").value;

        // Guarda los datos en el localStorage
        localStorage.setItem("playerName", playerName);
        localStorage.setItem("seed", seed);

        // Redirige al juego
        window.location.href = "thegame.html";
    });

    // Si existe un nombre de jugador y una seed guardados en localStorage, llena los campos
    const savedPlayerName = localStorage.getItem("playerName");
    const savedSeed = localStorage.getItem("seed");

    if (savedPlayerName) {
        document.getElementById("playerName").value = savedPlayerName;
    }

    if (savedSeed) {
        document.getElementById("seed").value = savedSeed;
    }
});
