
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDuRiOQPrApmHY885lIGYETsjzXd9uddh0",
    authDomain: "portfolio-navami.firebaseapp.com",
    projectId: "portfolio-navami",
    storageBucket: "portfolio-navami.firebasestorage.app",
    messagingSenderId: "1093562387305",
    appId: "1:1093562387305:web:180019ccbebb0450cd4bf8"
};

const app = initializeApp(firebaseConfig);

export { app };
