
const firebaseConfig = {
    apiKey: "AIzaSyAnXYLVdCrpc5cHgYHbhuHK7tOhi3NajMQ",
    authDomain: "thegamevd.firebaseapp.com",
    databaseURL: "https://thegamevd-default-rtdb.firebaseio.com",
    projectId: "thegamevd",
    storageBucket: "thegamevd.appspot.com",
    messagingSenderId: "591414593464",
    appId: "1:591414593464:web:ba2939d5999eb6a0d4b14d"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Obtén una referencia a la base de datos de Firebase
const database = firebase.database();

// Obtén una referencia a la tabla 'rank' en tu base de datos
const rankRef = firebase.database().ref('rank');

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


const nuevoUsuario = JSON.parse(localStorage.getItem('nuevoUsuario'));
if (nuevoUsuario) {
    rankRef.push(nuevoUsuario);
    localStorage.clear()
} else {
    console.log('No se encontraron datos en el localStorage');
}
