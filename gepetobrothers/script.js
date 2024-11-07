const palabras = ["javascript", "html", "css"];
let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
let letrasAdivinadas = [];
let intentos = 10;

const palabraDiv = document.getElementById("palabra");
const letterInput = document.getElementById("letraInput");
const adivinaBoton = document.getElementById("adivinarBoton");
const mensajeEstado = document.getElementById("mensajeEstado");
const mensajeIntentos = document.getElementById("mensajeIntentos");

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
    for (let palabra of palabraRandom) {
        if (!letrasAdivinadas.includes(palabra)) {
            todasLetrasAdivinadas = false;
            break;
        }
    }

    if (todasLetrasAdivinadas) {
        mensajeEstado.innerText = "¡Ganaste!";
        adivinaBoton.disabled = true;
    } else if (intentos <= 0) {
        mensajeEstado.innerText = `Perdiste. La palabra era: ${palabraRandom}`;
        adivinaBoton.disabled = true;
    }
}

adivinaBoton.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (letrasAdivinadas.includes(letter) || letter === '') {
        mensajeEstado.innerText = "Ya adivinaste esa letra o no ingresaste nada.";
        return;
    }

    letrasAdivinadas.push(letter);

    if (!palabraRandom.includes(letter)) {
        intentos--;
        mensajeIntentos.innerText = `Intentos restantes: ${intentos}`;
    }

    mostrarPalabra();
    estadoAhorcado();
});

mostrarPalabra();
mensajeIntentos.innerText = `Intentos restantes: ${intentos}`;
