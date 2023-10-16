
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

export {rankRef };
export {database};