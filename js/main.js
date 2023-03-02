'use strict';
// Facilitar el uso de document
let d = document;

// Guardar los parametros de background para usar de forma mas facil en adelante.
var cespe = "background: url('img/cespe.png');";
var cartel = "background: url('img/cartel.png');";
var fin = "background: url('img/fin.png');";
var monstro = "background: url('img/monstro.png');";
var personaje = "background: url('img/personaje.png');";
var casa = "background: url('img/casa.png');";

// Crear variabels globales, para guardar datos como nombre del jugador y tiragas hechas
var nombreJ = "";
var tiradas = 1;

// Luego de login entrar a esta fusion, donde pinta otra pagina para que el usuario pueda introducir un nombre.
export function entrar() {
    // Genera la pagina para el usuario pueda introducir un nombre de jugador
    nombreJugador();

    // Escuchar el boton jugar para sabir si el usuario ha decidido jugar o no.
    document.getElementsByClassName("btn btn-primary")[0].addEventListener("click",(e)=>{
        e.preventDefault();

        // Coger el nombre y meter al variable globar
        nombreJ = document.getElementById("nombre").value;
        // Comrobar si el usario a introducio un nombre, de lo contrario lo asigno yo uno
        if(nombreJ==""){
            nombreJ = "Heroe sin nombre"
        }
        // Borra la pagina de nombre, para poder continuar
        let principal = d.getElementById("container");
        principal.remove();

        // Sirve para pintar la mapa y el boton del juego.
        crearMapa();
        crearBoton();

        // Mesaje de juego
        swal("¿Han perdido el manual?", "No te preocupes, todo tiene solución. Busca el cartel indicado en el mapa y podrás recuperarlo. ¡Solo tira el dado y trata de llegar allí! ¡Buena suerte!","info");
    });
}


// Crear la mapa de juego
function crearMapa() {
    // Contenedor para guardar toda la tabla
    let contenedor = d.createElement("div");
    contenedor.id = "container"
    contenedor.className = "container"
    contenedor.setAttribute("style", "background: url('img/fondo.jpg') no-repeat; background-size: cover;");
    d.body.appendChild(contenedor);

    let div = d.createElement("div");
    div.id = "form-container"
    contenedor.appendChild(div);

    let form = d.createElement("div");
    form.className="tabla_a";
    form.id="tabla_a";
    div.appendChild(form);

    let div1 = d.createElement("div");
    div1.id = "informaciones";
    div1.className = "informaciones";
    form.appendChild(div1);

    // Mostrar el nombre del Jugador
    let h1 = d.createElement("h1");
    h1.textContent = "Partida de: " + nombreJ;
    h1.className = "titulo_s"
    div1.appendChild(h1);

    let br = d.createElement("br");
    form.appendChild(br);
    let br1 = d.createElement("br");
    form.appendChild(br1);

    let tabla = d.createElement("table");
    tabla.id = "tabla";
    form.appendChild(tabla);

    // Pintar las celda de la tabla
    for (let i = 0; i < 10; i++) {
        let tr = d.createElement("tr");
        for (var j = 0; j < 10; j++) {
            let td = d.createElement("td");
            let id = "celda" + i + j;
            td.id = id;
            
            //Asignar obstaculos y detalles de la mapa
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
            //Añadir evento click para que mas delante pueda ser clicado
            td.addEventListener("click",movimiento)
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }

    // Genera mostros para el camino, puede tener de 1 a 9, ya que una celda puede ser recorrido mas de 1 vez
    for (let i = 0; i < 9; i++) {
        let x = Math.round(Math.random()*6)+2;
        let y = Math.round(Math.random()*6)+2;

        let td = d.getElementById("celda" + x + y);
        td.setAttribute("style", monstro);
        td.className="monstro";
    }
}

// Crear el boton para tirar dado
function crearBoton(){
    // Limpiar sirve para saber si la patalla ya existe el dado el dado, si existe eliminarlo y crear otro.
    let limpiar = false;
    // Creando boton
    let form = d.getElementById("tabla_a");
    let boton = d.createElement("button");
    boton.textContent = "Tirar"
    boton.className = "tirar"
    boton.id = "tirar"
    form.appendChild(boton);
    
    //Salto de linea
    let br = d.createElement("br");
    form.append(br);
    
    // Crear un evento click, cada vez que se pulsa genera un numero aleatorio y lo pasa para otro fusion
    boton.addEventListener("click",(evento)=>{
        // Generar numero aleatorio
        let aleatorio = Math.round(Math.random()*5)+1;
        if (limpiar){
            // Si ya tiene un dado, hay que eliminarlo y luego crear otro.
            let imagen = d.getElementById("espacio3D");
            let padre = imagen.parentNode;
            padre.removeChild(imagen);
        }

        // Sirve para genera la etiqueta donde esta el dado 3d
        let form = d.getElementById("tabla_a");
        let div = d.createElement("div");
        div.className="espacio3D";
        div.id ="espacio3D";
        form.appendChild(div);

        let div1 = d.createElement("div");
        div1.className="cubo3D";
        div.appendChild(div1);

        // Sirve  generar las caras del dado
        for(let i=1; i<=6; i++){
            let aside = d.createElement("aside");
            aside.className="cara cara" + i;
            div1.appendChild(aside);

            let canvas = d.createElement("canvas");
            canvas.className="dado";
            canvas.id="dado"+i;
            canvas.style.height="150px";
            canvas.style.width="150px";
            aside.appendChild(canvas);
        }

        // Sirve para pintar las caras del dado
        dibujar(aleatorio);
        limpiar = true;
        
        // Manda el numero aleatorio para poder genera las celdas que pueda mover.
        moverJugador(aleatorio);
    })
}

// Sirve para saber, donde puede mover el jugador luego de tira el dado 
function moverJugador(puntos){
    // Aquin sirve para saber si el usuario ya avia tirado el dado anteriormente, si ya existe celdas para mover, no generar mas para nada. 
    let paso = true;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let td = d.getElementById("celda" + i + j);
            if (td.classList[0] == "mover" || td.classList[1] == "mover") {
                paso = false;
                swal("¿Qué estás haciendo?", "Aún no tienes la oportunidad de mover el dado. Antes de eso, tendrás que mover tu ficha según el número que hayas obtenido en la tirada anterior. Así que, asegúrate de avanzar correctamente en el tablero antes de tirar el dado de nuevo.", "info");
            }
        }
    }

    // Entra cuando sabemos que el usuario no avia tirado dado anteriormente, y ya ha movido la celda.
    if(paso){
        // Busca la posicion del jugador para poder calculador donde mover.
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let td = d.getElementById("celda" + i + j);
                if (td.classList[0] == "personaje"  || td.classList[1] == "personaje") {
                    console.log(td);
                    var posicionX = j;
                    var posicionY = i;
                    
                    // Luego de encontrarlo, añade los puntos que el jugador en la tirada a sacado
                    let bajar = posicionY + puntos;
                    let derecha = posicionX + puntos;
                    let subir = posicionY - puntos;
                    let izquierda = posicionX - puntos;
                    
                    // Sirve para comprobar si la posicion sale de la tabla. Si sale de la celda, no mostra nada para que no salir de la tabla.
                    let salida = true;
                    if (bajar < 10) {
                        var bajarx = document.getElementById("celda" + bajar + posicionX);
                        bajarx.classList.add("mover");
                
                        bajarx.style.opacity = "0.7";
                        bajarx.style.border = "0.5px dashed grey";
                        salida = false;
                    }
                
                    if(derecha < 10){
                        var derechay = document.getElementById("celda" + posicionY + derecha);
                        derechay.classList.add("mover");
    
                        derechay.style.opacity = "0.7";
                        derechay.style.border = "0.5px dashed grey";
                        salida = false;
                    }
                
                    if(subir < 10 && subir > -1){
                        var subirx = document.getElementById("celda" + subir + posicionX);
                        subirx.classList.add("mover");
    
                        subirx.style.opacity = "0.7";
                        subirx.style.border = "0.5px dashed grey";
                        salida = false;
                    }
                
                    if(izquierda < 10 && izquierda > -1){
                        var izquierday = document.getElementById("celda" + posicionY + izquierda);
                        izquierday.classList.add("mover");
    
                        izquierday.style.opacity = "0.7";
                        izquierday.style.border = "0.5px dashed grey";
                        salida = false;
                    }
    
                    if(salida){
                        sinSalida();
                    }
                }
            }
        }
    }
}

// Este fusion sirve para administrar, todo los acciones que el usuario hace a la hora de mover.
function movimiento(e){
    console.log(e.target.classList[0]);
    if(e.target.classList[0]=="mover" || e.target.classList[1]=="mover"){
        //Buscar donde estaba el jugador antes, y borrarlo, para para asignar nuevo celda.
        let jugador = buscarElemento("personaje");
        jugador.forEach(element => {
            element.setAttribute("style", cespe);
            element.classList.remove("personaje");
            console.log("borrar personaje anterior");
            if(element.id=="celda00"){
                element.setAttribute("style", casa);
            }
        });
        
        // Buscar restos celdas que puede mover el jugador y borrarlo.
        let mover = buscarElemento("mover");
        mover.forEach(element => {
            element.classList.remove("mover");
            element.style.opacity = "";
            element.style.border = "";
        });

        // Entra cuando el usuario a movido una celda de monstro, sirve para mandarle a casa al jugador
        if(e.target.classList[0]=="monstro" || e.target.classList[1]=="monstro"){
            swal("¡No puede ser!", "Los monstruos te atacaron y te dejaron inconsciente. Cuando despertaste, te encontraste en tu base sin saber cómo llegaste allí.", "error");
            let empezar = document.getElementById("celda00");
            empezar.setAttribute("style", personaje);
            empezar.classList.add("personaje");

        // Entra cuando el usuario a llegado al final
        }else if(e.target.classList[0]=="fin" || e.target.classList[1]=="fin"){
            let empezar = document.getElementById("celda00");
            empezar.setAttribute("style", personaje);
            empezar.classList.add("personaje");
            finalizar();

        // Sirve para mostra datos del manul, ya que el usuario ha encontrado el manual
        } else if(e.target.classList[0]=="cartel" || e.target.classList[1]=="cartel"){
            swal("¡Felicidades! Has conseguido recuperar el manual del juego.", "Ahora que lo tienes, te explicamos cómo funciona. El objetivo del juego es llegar al final del recorrido, donde se encuentra el fuegata, con el menor número de tiradas posible y sin tocar a los monstruos que se interpondrán en tu camino. Tendrás que avanzar por el recorrido y tirar el dado en cada casilla para saber cuántas casillas puedes avanzar. Pero ¡ojo! Si caes en una casilla con un monstruo, tendrás que volver a empezar desde el principio. Es importante que elijas sabiamente el camino a seguir, ya que algunas casillas tienen obstáculos que te impedirán avanzar o te harán retroceder en el recorrido. ¡Disfruta del juego y demuestra que eres el mejor jugador!", "info");
            e.target.setAttribute("style", personaje);
            e.target.classList.add("personaje");

        // Sirve para asignar la nueva celda donde a movido el jugador
        } else {
            e.target.setAttribute("style", personaje);
            e.target.classList.add("personaje");
        }
        
        // Buscar informacion de dado, y comprueba si existe o no, si existe eliminar para actulizar los datos
        let info_dado = document.getElementById("info_dado");
        if(info_dado != null){
            info_dado.remove();
        }

        // Sirve para genera texto que mostra tiradas efectivas hecho por el usuario
        let informaciones = document.getElementById("informaciones");
        let p = d.createElement("p");
        p.textContent = "Has movido ya: " + tiradas + " veces";
        p.className = "info_dado";
        p.id = "info_dado";
        informaciones.appendChild(p);
        
        // Sumar una tirada para guardar el movimiento del usuario.
        tiradas++;
    }
}

// Este fusion sirve para buscar celdas mediante nombre del clase. En la que le pasas por el parametro
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

// Entra cuando el usuario tira el dado y no puede mover a nigun lado. Y avisarle para que pueda hacerlo otra vez.
function sinSalida(){
    swal("¡Vaya!", "Parece que has tenido mala suerte y no puedes avanzar. Tendrás que repetir la tirada para intentarlo de nuevo.", "warning");
}

// Generar la pagina para preguntar al usuario el nombre del jugador, luego de login
function nombreJugador() {
    // Conenedor para guardar todo
    let contenedor = d.createElement("div");
    contenedor.id = "container"
    contenedor.className = "container"
    contenedor.setAttribute("style", "background: url('img/fondo.jpg') no-repeat; background-size: cover;");
    d.body.appendChild(contenedor);

    let div = d.createElement("div");
    div.id = "form-container"
    contenedor.appendChild(div);

    let form = d.createElement("form");
    form.className="formulario";
    div.appendChild(form);

    let h1 = d.createElement("h1");
    h1.textContent = "Asignar nombre del Jugador";
    h1.className = "titulo_p"
    form.appendChild(h1);

    let div1 = d.createElement("div");
    div1.className = "form-group"
    form.appendChild(div1);

    let br = d.createElement("br");
    form.appendChild(br);
    let br1 = d.createElement("br");
    form.appendChild(br1);

    let label2 = d.createElement("label");
    label2.textContent = "Nombre del Jugador: ";
    label2.className = "texto_principal"
    label2.setAttribute("for","nombre")
    form.appendChild(label2);

    // Input para guardar el nombre
    let nombre = d.createElement("input");
    nombre.type = "nombre";
    nombre.className = "form-control";
    nombre.id = "nombre";
    form.appendChild(nombre);

    let br4 = d.createElement("br");
    form.appendChild(br4);

    // Boton para continuar, y empezar el juego
    let jugar = d.createElement("button");
    jugar.className = "btn btn-primary"
    jugar.textContent = "JUGAR";
    form.appendChild(jugar);
}

// Entrar aquin cuando el jugado a llegado al final, pregunta el usuario si quiere repetir
function finalizar(){
      swal({
        title: "Enhorabuena",
        text: `¡Has llegado al final después de ${tiradas} tiradas! ¿Te gustaría intentarlo de nuevo?`,
        icon: "success",
        buttons: true,
      })
      .then((e) => {
        if (e) {
            // Entra cuando el usuario quiere continuar. Resetea numero de tiradas y elimina la informacion del dado
            swal("¡Ahora puedes seguir disfrutando del juego! ¡Diviértete!", {
                icon: "success",
              });
              tiradas = 1;
              let info_dado = document.getElementById("info_dado");
              if(info_dado != null){
                  info_dado.remove();
              }

        } else {
            // Entra cuando el usuario no quiere continuar. Solo recarga la pagina y vulve al inicio
            location.reload();
        }
      });
}

// Sirve para pintar el bacground de los dados y luego unirlo, y con el numero recogido generar uno o otro
function dibujar(punto){
    var canvas = document.getElementById('dado1');

    if(punto == 1){
        if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado1.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado2');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado2.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado3');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado3.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado4');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado4.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado5');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado5.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado6');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado6.png') no-repeat; background-size: cover;");
          }
    }
    if(punto == 2){
        if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado2.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado2');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado1.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado3');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado3.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado4');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado4.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado5');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado6.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado6');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado5.png') no-repeat; background-size: cover;");
          }
    }
    if(punto == 3){
        if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado3.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado2');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado2.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado3');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado1.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado4');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado6.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado5');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado5.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado6');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado4.png') no-repeat; background-size: cover;");
          }
    }
    if(punto == 4){
        if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado4.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado2');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado2.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado3');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado6.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado4');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado1.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado5');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado5.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado6');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado3.png') no-repeat; background-size: cover;");
          }
    }
    if(punto == 5){
        if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado5.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado2');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado6.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado3');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado3.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado4');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado4.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado5');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado1.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado6');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado2.png') no-repeat; background-size: cover;");
          }
    }
    if(punto == 6){
        if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado6.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado2');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado2.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado3');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado3.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado4');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado4.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado5');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado5.png') no-repeat; background-size: cover;");
          }
          var canvas = document.getElementById('dado6');
          if (canvas.getContext){
            canvas.setAttribute("style", "background: url('img/dado1.png') no-repeat; background-size: cover;");
          }
    }

}