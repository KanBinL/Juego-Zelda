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
            } else if (id == "celda99") {
                td.setAttribute("style", fin);
            } else {
                td.setAttribute("style", cespe);
            }
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }

    for (let i = 0; i < 15; i++) {
        let x = Math.round(Math.random()*6)+2;
        let y = Math.round(Math.random()*6)+2;
        if(i==0 || i==14){
            let td = d.getElementById("celda" + x + y);
            td.setAttribute("style", tunel);
        } else if(i==1){
            let td = d.getElementById("celda" + x + y);
            td.setAttribute("style", flor);
        } else if (i==2 || i==3 || i==4){
            let td = d.getElementById("celda" + x + y);
            td.setAttribute("style", monstro);
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
            if (td.className == "personaje") {
                console.log(td);
                var posicionX = j;
                var posicionY = i;
                var tdJugador = td;
                td.classList.remove("personaje");
                td.style.backgroundColor = "black";
            }
        }
    }
    
    let bajar = posicionX + puntos;
    let derecha = posicionY + puntos;
    let izquierda = posicionX - puntos;
    let subir = posicionY - puntos;





    if (bajar < 10) {
        var bajarx = document.getElementById("celda" + bajar + posicionY);
        bajarx.setAttribute("style", "background-color: green;");
        bajarx.addEventListener("click",(evento)=>{
            bajarx.className = "personaje";
            tdJugador.setAttribute("style", "background-color: red;");
        })
    }

    if(derecha < 10){
        var derechay = document.getElementById("celda" + posicionX + derecha);
        derechay.setAttribute("style", "background-color: green;");
 
    }

    // if(izquierda < 10 && izquierda > -1){
    //     var izquierdax = document.getElementById("celda" + izquierda + posicionY);
    //     izquierdax.setAttribute("style", "background-color: green;");
    // }

    // if(subir < 10 && subir > -1){
    //     var subiry = document.getElementById("celda" + posicionX + subir);
    //     subiry.setAttribute("style", "background-color: green;");
    // }



}

