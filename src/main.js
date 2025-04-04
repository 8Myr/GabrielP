let currentInput = ""; // Stocke l'entrée actuelle
let previousInput = ""; // Stocke l'entrée précédente
let operation = null; // Stocke l'opération en cours

// Met à jour l'écran de la calculatrice
function updateScreen() {
    const screen = document.getElementById("screen");
    screen.textContent = `${previousInput} ${operation || ""} ${currentInput}`.trim();
}

// Ajoute un nombre à l'entrée actuelle
function appendNumber(number) {
    if (currentInput === "0" && number === "0") return; // Empêche plusieurs zéros au début
    currentInput += number;
    updateScreen();
}

// Définit l'opération
function setOperation(op) {
    if (currentInput === "") return; // Empêche de définir une opération sans entrée
    if (previousInput !== "") {
        calculateResult(); // Calcule le résultat si une opération est déjà en cours
    }
    operation = getOperationSymbol(op);
    previousInput = currentInput;
    currentInput = "";
    updateScreen();
}

// Calcule le résultat
function calculateResult() {
    if (previousInput === "" || currentInput === "" || operation === null) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 !== 0 ? num1 / num2 : "Erreur";
            break;
        default:
            return;
    }

    // Ajoute l'opération à l'historique
    addToHistory(`${previousInput} ${operation} ${currentInput} = ${result}`);

    // Met à jour les valeurs
    currentInput = result.toString();
    previousInput = "";
    operation = null;
    updateScreen();
}

// Efface l'écran et réinitialise les valeurs
function clearScreen() {
    currentInput = "";
    previousInput = "";
    operation = null;
    updateScreen();
}

// Ajoute une opération à l'historique
function addToHistory(entry) {
    const historyList = document.getElementById("history-list");
    const listItem = document.createElement("li");
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}

// Retourne le symbole de l'opération
function getOperationSymbol(op) {
    switch (op) {
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "x";
        case "divide":
            return "÷";
        default:
            return null;
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}