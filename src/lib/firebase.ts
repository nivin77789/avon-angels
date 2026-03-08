import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, update, remove, serverTimestamp } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCU3cCSHOrJoP9BxUurr6P-E6bX7JhKIME",
  authDomain: "avonangelshomecare.firebaseapp.com",
  databaseURL: "https://avonangelshomecare-default-rtdb.firebaseio.com",
  projectId: "avonangelshomecare",
  storageBucket: "avonangelshomecare.firebasestorage.app",
  messagingSenderId: "58160734672",
  appId: "1:58160734672:web:8808249a5b7421413e59d5",
  measurementId: "G-W8FD4LSFHM",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, update, remove, serverTimestamp };
