const playBtn = document.getElementById("play");
const mainTitle = document.querySelector(".main-title");
const grid = document.querySelector(".grid");
const difficultyInput = document.getElementById("difficulty");

playBtn.addEventListener("click", function () {
    mainTitle.classList.add("hidden");
    grid.classList.remove("hidden");
    grid.innerHTML = "";
    selectedDifficulty = difficultyInput.value;
    const squaresNumber = calculateSquareNumber(selectedDifficulty);
    const randomArray = generateRandomArray(squaresNumber);
    for (let i = 0; i < randomArray.length; i++) {
        const thisSquare = createSquare(randomArray[i], selectedDifficulty);
        thisSquare.addEventListener("click", handleSquareClick);
        grid.append(thisSquare);
    }
});

function generateRandomArray(length) {
    const randomArray = [];
    while (randomArray.length < length) {
        const randomNumber = getRndInteger(1, length);
        if (!randomArray.includes(randomNumber)) {
            randomArray.push(randomNumber);
        }
    }
    return randomArray;
}

function createSquare(innerNumber, difficulty) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("square");
    newSquare.classList.add(difficulty);
    newSquare.innerHTML = innerNumber;
    return newSquare;
}

function calculateSquareNumber (difficulty) {
    let calculatedNumber = 100;
    if (difficulty === "medium") {
        calculatedNumber = 81;
    } else if (difficulty === "hard") {
        calculatedNumber = 49;
    }
    return calculatedNumber;
}

function handleSquareClick() {
    this.classList.add("clicked");
    console.log(this.textContent);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}