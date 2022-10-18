const playBtn = document.getElementById("play");
const mainTitle = document.querySelector(".main-title");
const grid = document.querySelector(".grid");
const difficultyInput = document.getElementById("difficulty");
let squaresNumber = 0;
let squares = [];
let bombsArray = [];
let clickedArray = [];
let inGame = true;

playBtn.addEventListener("click", function () {
    inGame = true;
    clickedArray = [];
    mainTitle.classList.add("hidden");
    grid.classList.remove("hidden");
    grid.innerHTML = "";
    selectedDifficulty = difficultyInput.value;
    squaresNumber = calculateSquareNumber(selectedDifficulty);
    const randomArray = generateRandomArray(squaresNumber);
    bombsArray = generateRandomArray(16);
    for (let i = 0; i < randomArray.length; i++) {
        const thisSquare = createSquare(randomArray[i], selectedDifficulty);
        thisSquare.addEventListener("click", handleSquareClick);
        grid.append(thisSquare);
    }
    squares = document.getElementsByClassName("square");
});

///////////////////////////////////////

// Funzione per la generazione di un intero random compreso tra (min) e (max) inclusi
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione per la generazione di un array di n°(length) numeri compresi tra 1 e squaresNumber inclusi, in ordine random senza ripetizioni
function generateRandomArray(length) {
    const randomArray = [];
    while (randomArray.length < length) {
        const randomNumber = getRndInteger(1, squaresNumber);
        if (!randomArray.includes(randomNumber)) {
            randomArray.push(randomNumber);
        }
    }
    return randomArray;
}

// Funzione per la generazione di un elemento html square, imposta il numero al suo interno (innerNumber) e una classe (difficulty) che darà le sue dimensioni in base alla difficoltà scelta
function createSquare(innerNumber, difficulty) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("square");
    newSquare.classList.add(difficulty);
    newSquare.innerHTML = innerNumber;
    return newSquare;
}

// Funzione per il calcolo del numero di squares da mettere poi in griglia
function calculateSquareNumber (difficulty) {
    let calculatedNumber = 100;
    if (difficulty === "medium") {
        calculatedNumber = 81;
    } else if (difficulty === "hard") {
        calculatedNumber = 49;
    }
    return calculatedNumber;
}

// Funzione per la gestione della fine del gioco, mostra esito e punteggio, inoltre se l'utente perde mostra la posizione di tutte le bombe
function handleSquareClick() {
    if (inGame) {
        thisSquareNumber = parseInt(this.textContent);
        if (!clickedArray.includes(thisSquareNumber)) {
            this.classList.add("clicked");
            clickedArray.push(thisSquareNumber);
            if (bombsArray.includes(thisSquareNumber)) {
                inGame = false;
                for (let i = 0; i < squares.length; i++) {
                    const thisSquare = squares[i];
                    if (bombsArray.includes(parseInt(thisSquare.textContent))) {
                        thisSquare.classList.add("bomb");
                    }
                }
                mainTitle.classList.remove("hidden");
                mainTitle.textContent = `Hai perso - Punteggio: ${clickedArray.length - 1}`;
            } else if (clickedArray.length >= (squaresNumber - 16)) {
                inGame = false;
                mainTitle.classList.remove("hidden");
                mainTitle.textContent = `Hai vinto! - Punteggio: ${clickedArray.length}`;
            }
        }
    }
}