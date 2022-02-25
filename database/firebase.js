import firebase from "firebase/compat";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFAtlK4a_O4RFVw-9YS4qavXa_L6BvGRM",
    authDomain: "sm52-5f98c.firebaseapp.com",
    projectId: "sm52-5f98c",
    storageBucket: "sm52-5f98c.appspot.com",
    messagingSenderId: "929469157882",
    appId: "1:929469157882:web:384893fe0f4c76c64a9443",
    measurementId: "G-RK1DX4WKPM"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {firebase,db};  