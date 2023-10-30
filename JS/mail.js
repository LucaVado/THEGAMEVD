import { rankRef } from './firebaseConfig';


if(document.getElementById('puntuacionesTable') !=null){
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
            vecesjugada: rankData[key].vecesjugada,
        });
    }

    // Ordena el arreglo por el puntaje de menor a mayor donde ordenada score y luego vecesjugada
    rankArray.sort((a, b) => {
        if (a.score === b.score) {
            return a.vecesjugada - b.vecesjugada;
        }
        return a.score - b.score;
    });

    const puntuacionesTable = document.getElementById('puntuacionesTable');
    const tbody = puntuacionesTable.querySelector('tbody');

    // Borra las filas existentes en la tabla
    tbody.innerHTML = '';

    // Recorre los datos ordenados y crea filas para la tabla
    let rank = 1;
    for (const entry of rankArray) {
        //Detiene el bucle limitandolo a 10
        if (rank > 5) {
            break;
        }
        const usuario = entry.nombre;
        const puntuaje = entry.score;

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
}
if(document.getElementById('puntuacionesTableCompleta') !=null) {
    rankRef.on('value', (snapshot) => {
        const rankDataCompleta = snapshot.val();

        // Convierte los datos en un arreglo de objetos
        const rankArray = [];
        for (const key in rankDataCompleta) {
            rankArray.push({
                id: key,
                nombre: rankDataCompleta[key].nombre,
                score: rankDataCompleta[key].score,
                seed: rankDataCompleta[key].seed,
                vecesjugada: rankDataCompleta[key].vecesjugada,
            });
        }

        // Ordena el arreglo por el puntaje de menor a mayor donde ordenada score y luego vecesjugada
        rankArray.sort((a, b) => {
            if (a.score === b.score) {
                return a.vecesjugada - b.vecesjugada;
            }
            return a.score - b.score;
        });

        const puntuacionesTableCompleta = document.getElementById('puntuacionesTableCompleta');
        const tbodyCompleta = puntuacionesTableCompleta.querySelector('tbody');

        // Borra las filas existentes en la tabla
        tbodyCompleta.innerHTML = '';

        // Recorre los datos ordenados y crea filas para la tabla
        let rank = 1;
        for (const entry of rankArray) {
            const usuario = entry.nombre;
            const puntuaje = entry.score;
            const vecesjugada = entry.vecesjugada;
            const seed = entry.seed;

            const row = tbodyCompleta.insertRow();
            const rankCell = row.insertCell(0);
            const puntuajeCell = row.insertCell(1);
            const usuarioCell = row.insertCell(2);
            const vecesjugadaCell = row.insertCell(3);

            const seedCell = row.insertCell(4);

            rankCell.innerHTML = `${rank}th`;
            puntuajeCell.innerHTML = puntuaje;
            usuarioCell.innerHTML = usuario;
            vecesjugadaCell.innerHTML = vecesjugada;
            seedCell.innerHTML = seed;

            rank++; // Incrementa el rango
        }


    });
}