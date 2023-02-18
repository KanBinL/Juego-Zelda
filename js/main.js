'use strict';
window.onload = inicio;
let d = document;
var cespe = "background: url('img/cespe.png');";
var cartel = "background: url('img/cartel.png');";
var flor = "background: url('img/flor.png');";
var hierba = "background: url('img/hierba.png');";
var fin = "background: url('img/fin.png');";
var monstro = "background: url('img/monstro.png');";
var personaje = "background: url('img/personaje.png');";
var tunel = "background: url('img/tunel.png');";
var casa = "background: url('img/casa.png');";

function inicio(){
    crearMapa();
    crearBoton();
}

function crearMapa() {
    let tabla = d.createElement("table");
    tabla.id = "tabla";
    d.body.appendChild(tabla);

    for (let i = 0; i < 10; i++) {
        let tr = d.createElement("tr");
        for (var j = 0; j < 10; j++) {
            let td = d.createElement("td");
            let id = "celda" + i + j;
            td.id = id;
            
            //cambiar tamaño en css
            if (id == "celda00") {
                td.setAttribute("style", personaje);
                td.className="personaje";
            } else if (id == "celda09") {
                td.setAttribute("style", cartel);
                td.className="cartel";
            } else if (id == "celda99") {
                td.setAttribute("style", fin);
                td.className="fin";
            } else {
                td.setAttribute("style", cespe);
            }
            td.addEventListener("click",movimiento)
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
        let tunelN = 1;
    for (let i = 0; i < 15; i++) {
        let x = Math.round(Math.random()*6)+2;
        let y = Math.round(Math.random()*6)+2;
        if(i==0 || i==14){
            let td = d.getElementById("celda" + x + y);
            td.setAttribute("style", tunel);
            td.className="tunel" + tunelN;
            tunelN++;
        } else if(i==1){
            let td = d.getElementById("celda" + x + y);
            td.setAttribute("style", flor);
            td.className="flor";
        } else if (i==2 || i==3 || i==4){
            let td = d.getElementById("celda" + x + y);
            td.setAttribute("style", monstro);
            d.className="monstro";
        } else {
            let td = d.getElementById("celda" + x + y);
            td.setAttribute("style", hierba);
        }
    }
}

function crearBoton(){
    let limpiar = false;
    let boton = d.createElement("button");
    boton.textContent = "Tirar"
    boton.id = "tirar"
    d.body.appendChild(boton);
        
    let br = d.createElement("br");
    d.body.append(br);

    boton.addEventListener("click",(evento)=>{
        let aleatorio = Math.round(Math.random()*5)+1;

        if (limpiar){
            let imagen = d.getElementById("dado");
            let padre = imagen.parentNode;
            padre.removeChild(imagen);
        }

        let img = d.createElement("img");
        img.src = "img/dado" + aleatorio + ".png";
        img.alt = "Dados con punto: " + aleatorio;
        img.id = "dado";
        d.body.appendChild(img);
        limpiar = true;


        moverJugador(aleatorio);
    })

}

function moverJugador(puntos){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let td = d.getElementById("celda" + i + j);
            if (td.classList[0] == "personaje"  || td.classList[1] == "personaje") {
                console.log(td);
                var posicionX = j;
                var posicionY = i;
            }
        }
    }
    
    let bajar = posicionX + puntos;
    let derecha = posicionY + puntos;
    let subir = posicionX - puntos;
    let izquierda = posicionY - puntos;

    if (bajar < 10) {
        var bajarx = document.getElementById("celda" + bajar + posicionY);
        bajarx.classList.add("mover");

        bajarx.style.opacity = "0.7";
        bajarx.style.border = "0.5px dashed grey";
    }

    if(derecha < 10){
        var derechay = document.getElementById("celda" + posicionX + derecha);
        derechay.classList.add("mover");
        derechay.style.opacity = "0.7";
        derechay.style.border = "0.5px dashed grey";
    }

    if(subir < 10 && subir > -1){
        var subirx = document.getElementById("celda" + subir + posicionY);
        subirx.classList.add("mover");
        subirx.style.opacity = "0.7";
        subirx.style.border = "0.5px dashed grey";
    }

    if(izquierda < 10 && izquierda > -1){
        var izquierday = document.getElementById("celda" + posicionX + izquierda);
        izquierday.classList.add("mover");
        izquierday.style.opacity = "0.7";
        izquierday.style.border = "0.5px dashed grey";
    }
}

function movimiento(e){    
    console.log(e.target.classList[0]);

    if(e.target.classList[0]=="mover" || e.target.classList[1]=="mover"){
        let jugador = buscarElemento("personaje");
        jugador.forEach(element => {
            element.setAttribute("style", cespe);
            element.classList.remove("personaje");
            console.log("dawd");
            if(element.id=="celda00"){
                element.setAttribute("style", casa);
            }
        });

        e.target.setAttribute("style", personaje);
        e.target.classList.add("personaje");
        
    }

    let mover = buscarElemento("mover");
    mover.forEach(element => {
        element.classList.remove("mover");
        element.style.opacity = "";
        element.style.border = "";
    });
            // //eliminar clase
            // console.log(e.target.classList);
            // // e.target.classList.remove("dd");
            // console.log(e.target.classList);
}

function buscarElemento(clase){
    let array = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let td = d.getElementById("celda" + i + j);
            if (td.classList[0] == clase || td.classList[1] == clase) {
                array.push(td);
            }
        }
    }
    return array;
}