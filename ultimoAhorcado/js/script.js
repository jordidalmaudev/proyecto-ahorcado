let popupWindow;

window.onload = function () {
    popupWindow = window.open("popup.html", "_blank", "width=400,height=400,top=200,left=400");
    console.log(popupWindow);
    
    //  Si l’usuari tanca el popup amb la figura tornem directament al menú principal
    const checkPopupClosed = setInterval(() => {
        if (popupWindow.closed) {
            clearInterval(checkPopupClosed); 
            window.location.href = 'index.html';  
        }
    }, 200);
}

const palabras = ["javascript", "html", "css"];
let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
let letrasAdivinadas = [];
let estadisticasPartidas = [];
let intentos = 11;
let tiempoInicio;
let tiempoTranscurrido;
let temporizadorIntervalo;

const palabraDiv = document.getElementById("palabra");
const letraInput = document.getElementById("letraInput");
const adivinaBoton = document.getElementById("adivinarBoton");
const mensajeEstado = document.getElementById("mensajeEstado");
const mensajeIntentos = document.getElementById("mensajeIntentos");
const mensajeTiempo = document.getElementById("mensajeTiempo");


function iniciarTemporizador() {
    tiempoInicio = Date.now();
    temporizadorIntervalo = setInterval(actualizarTiempo, 1000);
}

function detenerTemporizador() {
    clearInterval(temporizadorIntervalo);
    tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000; // Tiempo en segundos
}

function actualizarTiempo() {
    tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000; // Tiempo en segundos
    // Calculamos minutos y segundos
    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = Math.floor(tiempoTranscurrido % 60);

    // Mostramos el tiempo en formato "Minutos:Segundos"
    mensajeTiempo.innerText = `Tiempo: ${minutos}m ${segundos}s`;
}

function mostrarPalabra() {
    let resultado = '';
    for (let letra of palabraRandom) {
        resultado += letrasAdivinadas.includes(letra) ? letra : '_';
        resultado += ' ';
    }
    palabraDiv.innerHTML = resultado.trim(); //elimina espacios en blanco al final
}

function estadoAhorcado() {
    let todasLetrasAdivinadas = true;
    for (let letter of palabraRandom) {
        if (!letrasAdivinadas.includes(letter)) {
            todasLetrasAdivinadas = false;
            break;
        }
    }

    if (todasLetrasAdivinadas) {
        detenerTemporizador();
        mensajeEstado.innerText = `¡Ganaste! Tiempo: ${tiempoTranscurrido.toFixed(1)} segundos`;

        // Crear el botó de tornar a l'índex
        const botonVolver = document.createElement('button');
        botonVolver.classList = "volver";
        botonVolver.innerText = 'Volver al inicio';
        botonVolver.onclick = function() {
            popupWindow.close();
            window.location.href = 'index.html';
        };

        // Afegir el botó al missatge d'estat o a un altre element del DOM
        mensajeEstado.appendChild(botonVolver);

        let estadisticasPartidaGanada = {
            resultado: "Ganaste",
            tiempo: tiempoTranscurrido.toFixed(1),
            fecha: new Date().toLocaleString()
        }

        if (localStorage.getItem("estadisticasPartida") !== null) {
            estadisticasPartidas = JSON.parse(localStorage.getItem("estadisticasPartida"));
        }

        estadisticasPartidas.push(estadisticasPartidaGanada);
        localStorage.setItem("estadisticasPartida", JSON.stringify(estadisticasPartidas));
        adivinaBoton.disabled = true;

    } else if (intentos <= 1) {
        detenerTemporizador();
        mensajeEstado.innerText = `Perdiste. La palabra era: ${palabraRandom}. Tiempo: ${tiempoTranscurrido.toFixed(1)} segundos`;

        // Crear el botó de tornar a l'índex
        const botonVolver = document.createElement('button');
        botonVolver.classList = "volver";
        botonVolver.innerText = 'Volver al inicio';
        botonVolver.onclick = function() {
            popupWindow.close();
            window.location.href = 'index.html';
        };

        // Afegir el botó al missatge d'estat o a un altre element del DOM
        mensajeEstado.appendChild(botonVolver);

        let estadisticasPartidaPerdida = {
            resultado: "Perdiste",
            tiempo: tiempoTranscurrido.toFixed(1),
            fecha: new Date().toLocaleString()
        }
        if (localStorage.getItem("estadisticasPartida") !== null) {
            estadisticasPartidas = JSON.parse(localStorage.getItem("estadisticasPartida"));
        }
        estadisticasPartidas.push(estadisticasPartidaPerdida);
        localStorage.setItem("estadisticasPartida", JSON.stringify(estadisticasPartidas));
        adivinaBoton.disabled = true;
    }
}


let totalcaracteres = "&,',+,-,0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,²,³,·,À,Á,Å,Æ,Ç,È,É,Í,Ñ,Ò,Ó,Ö,Ø,Ú,à,á,â,ã,ä,å,ç,è,é,ê,ë,ì,í,î,ï,ñ,ò,ó,ô,ö,ø,ù,ú,û,ü,ý,Ā,ā,ă,ć,Č,č,Ē,ē,ė,ę,ī,ı,ķ,Ł,ł,ń,ň,Ō,ō,ŏ,ő,œ,ř,Ś,ś,Ş,ş,Š,š,ţ,ū,ŭ,ů,ź,ż,Ž,ž,ǎ,ǒ,Ǧ,ǧ,ḍ,ḗ,Ḥ,ḥ,ḫ,ṇ,ṛ,ṣ,Ṭ,ṭ,₂";

let arrayCaracteres = totalcaracteres.split(",");

adivinaBoton.addEventListener("click", () => {
    const letra = letraInput.value.toLowerCase();

    if (!arrayCaracteres.includes(letra)) {
        mensajeEstado.innerText = "Letra no válida.";
        return;
    }

    letraInput.value = '';

    if (letrasAdivinadas.includes(letra) || letra === '') {
        mensajeEstado.innerText = "Ya adivinaste esa letra o no ingresaste nada.";
        return;
    }

    letrasAdivinadas.push(letra);

    if (!palabraRandom.includes(letra)) {
        intentos--;
        mensajeIntentos.innerText = `Intentos restantes: ${intentos - 1}`;
        popupWindow.postMessage(intentos, "http://127.0.0.1:5501");
    }
    mostrarPalabra();
    estadoAhorcado();
}

);

iniciarTemporizador();
mostrarPalabra();
mensajeIntentos.innerText = `Intentos restantes: ${intentos - 1}`;
