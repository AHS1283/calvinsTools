import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // if you also need Auth
const firebaseConfig = {
  apiKey: "AIzaSyD1AfIY8S_7GYT3LBP-jP0jlgm1JJRXqis",
  authDomain: "calvinstools-71be0.firebaseapp.com",
  projectId: "calvinstools-71be0",
  storageBucket: "calvinstools-71be0.firebasestorage.app",
  messagingSenderId: "394041014028",
  appId: "1:394041014028:web:48b287f23c73da00137b29",
  measurementId: "G-KRXGXSTFLD"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth(app); // if you also need Auth