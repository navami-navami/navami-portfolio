import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
    addDoc,
    collection
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");

const loginMessage = document.getElementById("login-message");
const certificateMessage = document.getElementById("certificate-message");

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
    } else {
        loginSection.style.display = "block";
        dashboardSection.style.display = "none";
    }
});

document.getElementById("login-button").addEventListener("click", async () => {
    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value;

    loginMessage.textContent = "Signing in...";

    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginMessage.textContent = "";
    } catch (error) {
        loginMessage.textContent = "Login failed. Check your email and password.";
    }
});

document.getElementById("logout-button").addEventListener("click", async () => {
    await signOut(auth);
});

document.getElementById("add-certificate-button").addEventListener("click", async () => {
    if (!auth.currentUser) {
        certificateMessage.textContent = "Please log in first.";
        return;
    }

    const certificate = {
        title: document.getElementById("cert-title").value.trim(),
        category: document.getElementById("cert-category").value.trim(),
        organization: document.getElementById("cert-organization").value.trim(),
        result: document.getElementById("cert-result").value.trim(),
        score: Number(document.getElementById("cert-score").value),
        issuedDate: document.getElementById("cert-date").value
    };

    if (!certificate.title || !certificate.category || !certificate.issuedDate) {
        certificateMessage.textContent = "Please fill in the title, category and date.";
        return;
    }

    certificateMessage.textContent = "Saving certificate...";

    try {
        await addDoc(collection(db, "certificates"), certificate);

        certificateMessage.textContent = "Certificate added successfully!";

        document.getElementById("cert-title").value = "";
        document.getElementById("cert-category").value = "";
        document.getElementById("cert-organization").value = "";
        document.getElementById("cert-result").value = "";
        document.getElementById("cert-score").value = "";
        document.getElementById("cert-date").value = "";

    } catch (error) {
        certificateMessage.textContent = "Could not save certificate. Please try again.";
    }
});