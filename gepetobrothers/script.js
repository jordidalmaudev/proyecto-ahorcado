const words = ["javascript", "html", "css", "programacion", "desarrollo"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attempts = 6;

const wordDiv = document.getElementById("word");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const messageDiv = document.getElementById("message");
const hangmanDiv = document.getElementById("hangman");

function displayWord() {
    wordDiv.innerHTML = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
}

function checkGameStatus() {
    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        messageDiv.innerText = "¡Ganaste!";
        guessButton.disabled = true;
    } else if (attempts <= 0) {
        messageDiv.innerText = `Perdiste. La palabra era: ${selectedWord}`;
        guessButton.disabled = true;
    }
}

guessButton.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (guessedLetters.includes(letter) || letter === '') {
        messageDiv.innerText = "Ya adivinaste esa letra o no ingresaste nada.";
        return;
    }

    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
        attempts--;
        hangmanDiv.innerText = `Intentos restantes: ${attempts}`;
    }

    displayWord();
    checkGameStatus();
});

displayWord();
hangmanDiv.innerText = `Intentos restantes: ${attempts}`;
