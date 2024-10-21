
let tiempoInicial = 0;
const contadorElemento = document.getElementById("contador");
let intentos = 10; //podemos incluso poner modo facil(15) normal(10) dificil(5)
const intentosElemento = document.getElementById("intentos-restantes");
const botonEnviar = document.querySelector(".submit-button");
const gameOverContainer = document.getElementById("game-over-container");
const tituloContainer = document.querySelector(".titulo-subtitulo");

// Array de palabras
const paraules = [
  "casa", "jordi", "amistat", "festa", "flor", "xavi", "javi", 
  "tu", "javier", "si", "no", "foc", "llum", "destrucció", "cel"
];

// Elegir palabra aleatoria
const palabraAleatoria = paraules[Math.floor(Math.random() * paraules.length)];

// Obtener el contenedor de letras
const wordContainer = document.getElementById("word-container");

// Crear los divs de letter-space según el número de letras de la palabra
function generarEspaciosPalabra() {
  wordContainer.innerHTML = ''; // Limpiar el contenedor
  for (let i = 0; i < palabraAleatoria.length; i++) {
    const letterSpace = document.createElement('div');
    letterSpace.classList.add('letter-space');
    letterSpace.id = 'letraAñadida';
    wordContainer.appendChild(letterSpace);
  }
}


function actualizarContador() {
  tiempoInicial++;
  contadorElemento.textContent = `Tiempo: ${tiempoInicial} segundos`;
}

// Contador cuando se carga la ventana + generador de palabras
window.onload = function () {
  generarEspaciosPalabra();
  setInterval(actualizarContador, 1000);
};

//INFORMACION VISUAL PARA EL JUGADOR (luego lo aprovechamos para las img)
function reducirIntentos() {
  if (intentos > 0) {
    intentos--;
    intentosElemento.textContent = `Intentos restantes: ${intentos}`;
  }
  if (intentos === 0) {
    gameOver();
  }
}
// GAME OVER VISIBLE + opicón de volver al inicio
//--pendiente de mejorar a nivel visual y 
// display:none asi el jugador no puede jugar más
//o podemos inventarnos un html de GAME OVER mas currao
function gameOver() {
  document.querySelector(".game-container").style.display = "none";
  tituloContainer.style.display = "none";
  gameOverContainer.style.display = "block";
}
function añadirLetra() {
  reducirIntentos();
  let inputLetra = document.getElementById("letra").value;

  console.log("------------------");
  
  
  let letterSpace = document.getElementById("letraAñadida");
  letterSpace.innerHTML = inputLetra;

}

botonEnviar.addEventListener("click", añadirLetra);