import { rankRef } from './firebaseConfig';

// Escucha cambios en la tabla 'rank'
rankRef.on('value', (snapshot) => {
    const rankData = snapshot.val();

    // Convierte los datos en un arreglo de objetos
    const rankArray = [];
    for (const key in rankData) {
        rankArray.push({
            id: key,
            nombre: rankData[key].nombre,
            score: rankData[key].score,
            seed: rankData[key].seed,
        });
    }

    // Ordena el arreglo por el puntaje de menor a mayor
    rankArray.sort((a, b) => a.score - b.score);

    // Supongamos que tienes una tabla HTML con el id 'puntuacionesTable' para mostrar los datos.
    const puntuacionesTable = document.getElementById('puntuacionesTable');
    const tbody = puntuacionesTable.querySelector('tbody');

    // Borra las filas existentes en la tabla
    tbody.innerHTML = '';

    // Recorre los datos ordenados y crea filas para la tabla
    let rank = 1;
    for (const entry of rankArray) {
        const usuario = entry.nombre;
        const puntuaje = entry.score;
        const seed = entry.seed;

        const row = tbody.insertRow();
        const rankCell = row.insertCell(0);
        const puntuajeCell = row.insertCell(1);
        const usuarioCell = row.insertCell(2);

        rankCell.innerHTML = `${rank}th`;
        puntuajeCell.innerHTML = puntuaje;
        usuarioCell.innerHTML = usuario;

        rank++; // Incrementa el rango
    }
});


