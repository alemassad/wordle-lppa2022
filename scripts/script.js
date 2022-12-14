const caja = document.querySelector(".contenedor-caja");
const teclado = document.querySelector(".contenedor-letra");
const mostrarMensaje = document.querySelector(".contenedor-mensaje");
const modal = document.getElementById("modal");
const mostrarReloj = document.getElementById("reloj");

var mensajeInicial="Hola ";

//const cronos = document.getElementById("crono");

modal.style.visibility= "visible";       
var nombre = localStorage.getItem("nombre");

if (localStorage.getItem("nombre")) {//cargamos el nombre del localstorage
    mensajeInicial= mensajeInicial+localStorage.getItem("nombre");
}
const elementoMensaje = document.createElement("p");//creamos <P>
elementoMensaje.textContent = mensajeInicial;     
modal.append(elementoMensaje);
 
const btnJugar = document.createElement("button");//creamos boton para cargar una partida
btnJugar.textContent = "Play";
btnJugar.setAttribute("id", "cargar");    
modal.append(btnJugar);
btnJugar.addEventListener("click", () => btnJugar);//cerramos el modal de Inicio

const btnJugarNuevo = document.createElement("button");//creamos boton nuevo jugador
btnJugarNuevo.textContent = "New User";
btnJugarNuevo.setAttribute("id", "jugar");    
modal.append(btnJugarNuevo);
btnJugarNuevo.addEventListener("click", () => btnJugarNuevo);//cerramos el modalDeInicio


btnJugarNuevo.onclick =function(){     
    modal.removeChild(btnJugar); 
    modal.removeChild(btnJugarNuevo);                   
     
    const labelNombre = document.createElement("label");//creamos una etiqueta para el nombre 
    labelNombre.textContent = "Ingrese su Nombre";
    labelNombre.setAttribute("id", "labelNombre");    
    modal.append(labelNombre);

    const inputNombre = document.createElement("input");//creamos una caja de texto para el nombre   
    inputNombre.setAttribute("id", "inputNombre"); 
    inputNombre.setAttribute("minlength", "4");   
    modal.append(inputNombre);

    const btnMandar = document.createElement("button");//creamos boton para guardar el nombre
    btnMandar.textContent = "Mandar";
    btnMandar.setAttribute("id", "mandar");    
    modal.append(btnMandar);
    btnMandar.addEventListener("click", () => btnMandar);

    inputNombre.focus();
    btnMandar.onclick =function(){                        
          
        mensajeInicial= mensajeInicial+inputNombre.value;
        localStorage.setItem("nombre",inputNombre.value);    
        iniciarJuego();   
    }
    document.addEventListener("keydown", event => {
        if(event.keyCode == 13){ //Tecla Enter        
        iniciarJuego();           
        return //volvemos y no se agrega la letra
        }
    });    
}
btnJugar.onclick =function(){   
         
    modal.style.visibility= "hidden";
    iniciarJuego();  
}
let columnaActual=0;
let cajaActual=0;
let finJuego=false;
let listaWordle = ["MARZO", "LUNES", "NOVIA", "NOCHE", "CARRO", "ÑANDU", "CALLE", "SUPER", "ALOJA", "MURAL", "PERRO", "PLATA", "LIMON",];
const wordle = listaWordle[Math.floor(Math.random() * listaWordle.length)];
console.log("El arreglo es: ");
console.log(listaWordle);
console.log("Y una palabra aleatoria es: ");
console.log(wordle);

/* const captarPalabra = () =>{
    fetch("https://wordle.danielfrg.com/words/5.json")
        .then(respuesta => respuesta.jason())
        .then(json => {
            wordle = json.toUpperCase();
        })
        .catch(e => console.log(e))
}
captarPalabra(); */


const letras = ['Q','W','E','R','T','Y','U','I','O','P',
'A','S','D','F','G','H','J','K','L','Ñ','ENTER',
'Z','X','C','V','B','N','M','◄',]

const grilla = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

const iniciarJuego= () => { //aquí comienza el juego  

    
    reloj();
    
    while (modal.firstChild) { //vaciamos el modal
        modal.removeChild(modal.firstChild);
    }  
    modal.style.visibility= "hidden"; 
    console.log(mensajeInicial);

    grilla.forEach((columna, columnaIndex) =>{ //recorremos la grilla y le agregamos inputs en el HTML
        const elementoColumna=document.createElement("div");
        elementoColumna.setAttribute("id","columna"+columnaIndex);
        columna.forEach((caja, cajaIndex)=>{
            const elementoFila=document.createElement("input");
            elementoFila.setAttribute("id","columna-"+columnaIndex+"-caja-"+cajaIndex);
            elementoFila.setAttribute("maxlength","1");
            elementoFila.classList.add("caja");
            elementoColumna.append(elementoFila);
            
        })
        caja.append(elementoColumna);        
    })
    letras.forEach(letra => { // creamos botones pare el tablero
        const inputEntrada = document.createElement("button");
        inputEntrada.textContent = letra;
        inputEntrada.setAttribute("id", letra);
        inputEntrada.addEventListener("click", () => siNoEsLetra(letra));//llamamos a la funcion al clickear
        teclado.append(inputEntrada);
    }) 
     
    //funcionalidades con el  teclado
    document.addEventListener("keydown", event => {
        if(event.keyCode == 8){ //Tecla BackSpace
            console.log('BackSpace');
            borrarLetra();     
            return //volvemos y no se agrega la letra
        }
        if(event.keyCode == 13){ //Tecla Enter
        console.log('Enter');
        concuerdaPalabra();           
        return //volvemos y no se agrega la letra
        }
        var letrado= event.key;
        letrado = letrado.toUpperCase();
        agregarLetra(letrado);//llamamos a la funcion para agregar esta letra        
    });


    const siNoEsLetra= (let) => {
        if (!finJuego) {        
            
            console.log("Cliqueaste ", let);
            if (let === "◄") {
                borrarLetra();     
                return //volvemos y no se agrega la flecha
            }
            if (let==="ENTER"){
                concuerdaPalabra();           
                return //volvemos y no se agrega la letra Enter
            }
            agregarLetra(let);//llamamos a la funcion para agregar esta letra
            
        }
    }

    const agregarLetra = (le) => { //ponemos la letra dentro de la caja
        if (cajaActual <5 && columnaActual <6) {            
        const letraEnCaja = document.getElementById("columna-"+columnaActual+"-caja-"+cajaActual);
        letraEnCaja.value = le;
        grilla [columnaActual][cajaActual] = le;//agregamos a la grilla la letra actual
        letraEnCaja.setAttribute("data", le); // agregamos al atrubuto data la letra actual
        cajaActual ++; 
        letraEnCaja.focus();
        }
    }
    const borrarLetra = () =>{ // funcion que borra la letra actual
        if (cajaActual > 0) { //si no estamos en el primer input, volvemos al estado anterior          
        cajaActual --;
        const letraEnCaja = document.getElementById("columna-"+columnaActual+"-caja-"+cajaActual);
        letraEnCaja.value = "";
        letraEnCaja.setAttribute("data", "");
        letraEnCaja.focus();
        grilla [columnaActual][cajaActual] = "";//borramos la letra de la grilla
        }
    }

    const concuerdaPalabra = () => {
        const palabraActual = grilla [columnaActual].join("");
        
        if (cajaActual > 4) {
            console.log("palabra actual es: "+palabraActual+" Y la palabra wordle es: "+wordle);
            colorearCaja(); //llamamos a la funcion para colorear los imput
            if (wordle == palabraActual) { // si avidinamos la palabra ganadora, finalizamos el juego
                darMensaje("Adivinaste!!");
                finJuego = true;
                modal.style.visibility= "visible";   
                return
            } else {
                if (columnaActual >= 5 ) { //si estamos en el último input de la grilla, perdimos el juego
                    finJuego = true;
                    darMensaje("Game over!");
                    return
                }
                if (columnaActual < 5 ) { // si finalizamos la fila, saltamos a la fila siguiente de inputs
                    columnaActual ++;
                    cajaActual =0;
                    document.getElementById("columna-"+columnaActual+"-caja-"+cajaActual).focus();
                }
            }
        }
    }
    const darMensaje = (mensaje) => { //funcion que crea y muestra mensajes
        modal.style.visibility= "visible";       
        const elementoMensaje = document.createElement("h2");//creamos <P>
        elementoMensaje.textContent = mensaje;     
        modal.append(elementoMensaje);
        setTimeout(() => modal.removeChild(elementoMensaje), 5000);

        const btnCerrar = document.createElement("button");//creamos boton cerrar
        btnCerrar.textContent = "cerrar";
        btnCerrar.setAttribute("id", "cerrar");
        btnCerrar.addEventListener("click", () => location.href="index.html");//recargamos la pagina
        modal.append(btnCerrar);
    }
  
    const colorearTablero = (dataLetra, color) => { // funcion que colorea la letra del tablero
        const tecla = document.getElementById(dataLetra);
        tecla.classList.add(color);
    }
    const colorearCaja = () => { // funcion que verifica la letra y colorea el input
        const filaCaja = document.querySelector("#columna"+columnaActual).childNodes;
        let remarcaCaja= wordle;
        const adivinaArray= [];//array comodín para colocar data
        
        filaCaja.forEach(element => {
            adivinaArray.push({letra : element.getAttribute("data"), color: "grisear"});// obtenemos el atributo con data de la letra
        });
        adivinaArray.forEach((ele, index) => {
            if (ele.letra == wordle[index]) {
                ele.color = "verdear";
                remarcaCaja = remarcaCaja.replace(ele.letra, "");            
            }
        })
        adivinaArray.forEach(e => {
            if (remarcaCaja.includes(e.letra)) {
                e.color = "amarillear";
                remarcaCaja = remarcaCaja.replace(e.letra, "");
            }
        })
        console.log("Array: ", adivinaArray);

        filaCaja.forEach((input, indice) => {
            input.classList.add(adivinaArray[indice].color);
            colorearTablero(adivinaArray[indice].letra, adivinaArray[indice].color);
        })

    }

//funcionalidades Reloj
function reloj(){
    
    let tiempo=0;    

    
    setInterval(function(){
            if (finJuego == false) {
                tiempo++;
                mostrarReloj.innerHTML = "CRONO: "+tiempo;
            }
            if (finJuego == true) {        
                                                                
                finJuego=null;                           
            }
    },1000);
    mostrarReloj.innerHTML = "Tiempo: "+tiempo;
}
}
