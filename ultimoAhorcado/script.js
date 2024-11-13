let popupWindow;

window.onload = function () {
    popupWindow = window.open("popup.html", "_blank", "width=400,height=400,top=200,left=400");
    console.log(popupWindow);
    
}

const palabras = ["javascript", "html", "css"];
let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
let letrasAdivinadas = [];
let estadisticasPartidas = [];
let intentos = 10;
let tiempoInicio;
let tiempoTranscurrido;
let temporizadorIntervalo;

const palabraDiv = document.getElementById("palabra");
const letraInput = document.getElementById("letraInput");
const adivinaBoton = document.getElementById("adivinarBoton");
const mensajeEstado = document.getElementById("mensajeEstado");
const mensajeIntentos = document.getElementById("mensajeIntentos");

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
    mensajeTiempo.innerText = `Tiempo: ${tiempoTranscurrido.toFixed(1)} segundos`;
}

function mostrarPalabra() {
    let resultado = '';
    for (let letter of palabraRandom) {
        resultado += letrasAdivinadas.includes(letter) ? letter : '_';
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

    } else if (intentos <= 0) {
        detenerTemporizador();
        mensajeEstado.innerText = `Perdiste. La palabra era: ${palabraRandom}. Tiempo: ${tiempoTranscurrido.toFixed(1)} segundos`;

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



adivinaBoton.addEventListener("click", () => {
    const letra = letraInput.value.toLowerCase();
    letraInput.value = '';

    if (letrasAdivinadas.includes(letra) || letra === '') {
        mensajeEstado.innerText = "Ya adivinaste esa letra o no ingresaste nada.";
        return;
    }

    letrasAdivinadas.push(letra);

    if (!palabraRandom.includes(letra)) {
        intentos--;
        mensajeIntentos.innerText = `Intentos restantes: ${intentos}`;
        popupWindow.postMessage(intentos, "http://127.0.0.1:5501");


        // const imgElement = popupWindow.document.getElementById("imagenIntentos");
        // console.log(imgElement);

        //     if (imgElement) {
        //         imgElement.src = `./img/${intentos}.jpg`;
        //     }
    }
    mostrarPalabra();
    estadoAhorcado();
}

);

iniciarTemporizador();
mostrarPalabra();
mensajeIntentos.innerText = `Intentos restantes: ${intentos}`;
