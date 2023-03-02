'use strict';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// 
// Sirve para importar el fucion del mail.js
import { entrar } from './main.js';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

import {firebaseConfig} from "./firebaseConfig.js";

// Inicialiar la conexión Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const analytics = getAnalytics(app);
let d = document;

// Sirve para comprobar dato recivido
function login() {
    // Coger los datos escritos por el usuario
    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;
    const auth = getAuth();

    //Hace la comprobacon
    signInWithEmailAndPassword(auth,email, password)
    .then(function() {
        swal("¡Bienvenido de nuevo!",`Te has logueado correctamente como usuario ${email}. ¡Que tengas un buen día!`,"success");
        // Redirigir al panel de usuario o mostrar un mensaje

        // Borrar la pagina de login y ejecutar el fusion entrar importado
        let principal = d.getElementById("container");
        let padre = principal.parentNode;
        padre.removeChild(principal);
        entrar();
    })
    .catch(function(error) {
        if(email == "" || password == ""){
            swal("Lo siento, no puedes dejar ningún campo vacío.",`Por favor, asegúrate de llenar todos los campos requeridos para iniciar sesión.`,"error");
        } else {
            swal("Lo siento, parece que el usuario o la contraseña que ingresaste no son correctos.",`Por favor, verifica que has ingresado los datos correctos e inténtalo de nuevo.`,"error");
        }
        // Mostrar mensaje de error
    });
}

// Sirve para comprobar dato recivido
function registro() {
    // Coger los datos escritos por el usuario
    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;
    const auth = getAuth();

    //Hace la comprobacon
    createUserWithEmailAndPassword(auth,email, password)
    .then(function() {
        swal("¡Enhorabuena! Has completado el proceso de registro correctamente.",`Ya puedes iniciar sesión con tu dirección de correo electrónico: ${email}. ¡Bienvenido a nuestro sitio web!`,"success");
        // Redirigir al panel de usuario o mostrar un mensaje
    })
    .catch(function() {
        // Mostrar mensaje de error
        if(email == "" || password == ""){
            swal("Lo siento, pero no puedes dejar campos vacíos en el formulario de registro.",`Por favor, asegúrate de completar todos los campos obligatorios antes de enviar el formulario. ¡Gracias!`,"error");
        } else {
            swal("Lo siento, pero hubo un problema con el registro.",`Asegúrate de ingresar los datos de forma correcta. Recuerda que debes proporcionar una dirección de correo electrónico válida en el formato usuario@ejemplo.com y que la contraseña debe tener al menos 8 caracteres. ¡Inténtalo de nuevo!`,"error");
        }
    });
}

// Crear las etiques para html con DOM
function principal(){
    // contenedor que tiene todo
    let contenedor = d.createElement("div");
    contenedor.id = "container"
    contenedor.className = "container"
    contenedor.setAttribute("style", "background: url('img/fondo.jpg') no-repeat; background-size: cover;");
    d.body.appendChild(contenedor);

    let div = d.createElement("div");
    div.id = "form-container"
    contenedor.appendChild(div);

    // Dentro del formulario esta el input para que el usuario pueda introducir datos.
    let form = d.createElement("form");
    form.className="formulario";
    div.appendChild(form);
    
    // Titulo
    let h1 = d.createElement("h1");
    h1.textContent = "Juego Zelda";
    h1.className = "titulo_p"
    form.appendChild(h1);

    let br3 = d.createElement("br");
    form.appendChild(br3);

    let div1 = d.createElement("div");
    div1.className = "form-group"
    form.appendChild(div1);

    let label1 = d.createElement("label");
    label1.textContent = "Email: ";
    label1.className = "texto_principal"
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
    label2.className = "texto_principal"
    label2.setAttribute("for","password")
    form.appendChild(label2);

    let password = d.createElement("input");
    password.type = "password";
    password.className = "form-control";
    password.id = "password";
    form.appendChild(password);

    let br4 = d.createElement("br");
    form.appendChild(br4);

    // Boton para login y registrar
    let login = d.createElement("button");
    login.className = "btn btn-secondary"
    login.textContent = "LOGIN";
    form.appendChild(login);
    
    let registro = d.createElement("button");
    registro.className = "btn btn-primary registro"
    registro.textContent = "REGISTRO";
    form.appendChild(registro);
}

function inicio(){
    // Cargar el fusion principal creado, para generar etiqueta html
    principal();

    // Añadir evento click para boton login y registrar
    document.getElementsByClassName("btn btn-primary")[0].addEventListener("click",(e)=>{
        e.preventDefault();
        registro();
    });
    document.getElementsByClassName("btn btn-secondary")[0].addEventListener("click",(e)=>{
        e.preventDefault();
        login();
    });
}

// Pintar toda la estructura escrita
window.onload=inicio;