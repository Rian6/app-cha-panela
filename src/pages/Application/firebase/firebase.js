import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyArBcYCSpcc5qI1YHh6XoUrs6yF1gbJIQU",
    authDomain: "app-cha-panela.firebaseapp.com",
    projectId: "app-cha-panela",
    storageBucket: "app-cha-panela.appspot.com",
    messagingSenderId: "12076624917",
    appId: "1:12076624917:web:0735254aa00c200629321c",
    measurementId: "G-4FWPG8X42G"
  };

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };