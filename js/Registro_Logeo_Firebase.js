'use strict';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

import {firebaseConfig} from "./firebaseConfig.js";

// Inicialiar la conexión Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const analytics = getAnalytics(app);
let d = document;


function login() {
    console.log("LOGIN");
    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;
    const auth = getAuth();
    alert(`auth: ${auth} email: ${email}   password: ${password}`)
    signInWithEmailAndPassword(auth,email, password)
    .then(function(user) {
        console.log("User logged in: ", user);
        alert("User logged in: ", user)
        // Redirigir al panel de usuario o mostrar un mensaje
    })
    .catch(function(error) {
        console.log("Error logging in: ", error);
        alert("Error logging in: ", error)
        // Mostrar mensaje de error
    });
}

function registro() {
    console.log("REGISTER");
  alert("REGISTER")
    var email = document.getElementById("email").value;;
    var password = document.getElementById('password').value;
    const auth = getAuth();
    alert(`auth: ${auth} email: ${email}   password: ${password}`)
    createUserWithEmailAndPassword(auth,email, password)
    .then(function(user) {
        console.log("User registered: ", user);
        // Redirigir al panel de usuario o mostrar un mensaje
        alert("User registered: ", user)
    })
    .catch(function(error) {
        console.log("Error registering: ", error);
        // Mostar mensaje de error
        alert("Error registering: ", error);
    });
}

function principal(){
    let h1 = d.createElement("h1");
    h1.textContent = "Login";
    h1.id = "titulo_principal"
    d.body.appendChild(h1);

    let contenedor = d.createElement("div");
    contenedor.id = "container"
    d.body.appendChild(contenedor);

    let div = d.createElement("div");
    div.id = "form-container"
    contenedor.appendChild(div);

    let form = d.createElement("form");
    div.appendChild(form);

    let label1 = d.createElement("label");
    label1.textContent = "Email: ";
    label1.setAttribute("for","email")
    form.appendChild(label1);

    let email = d.createElement("input");
    email.type = "email";
    email.className = "form-control";
    email.id = "email";
    form.appendChild(email);

    let br = d.createElement("br");
    form.appendChild(br);
    let br1 = d.createElement("br");
    form.appendChild(br1);

    let label2 = d.createElement("label");
    label2.textContent = "Password: ";
    label2.setAttribute("for","password")
    form.appendChild(label2);

    let password = d.createElement("input");
    password.type = "password";
    password.className = "form-control";
    password.id = "password";
    form.appendChild(password);

    let login = d.createElement("button");
    login.className = "btn btn-secondary"
    login.textContent = "LOGIN";
    form.appendChild(login);
    
    let registro = d.createElement("button");
    registro.className = "btn btn-primary"
    registro.textContent = "REGISTRO";
    form.appendChild(registro);
}

function inicio(){
    principal()
    document.getElementsByClassName("btn btn-primary")[0].addEventListener("click",(e)=>{
        e.preventDefault();
        registro();

    });
    document.getElementsByClassName("btn btn-secondary")[0].addEventListener("click",(e)=>{
        e.preventDefault();
        login();

    });
}

window.onload=inicio;