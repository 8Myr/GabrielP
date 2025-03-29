let currentInput = '';
let previousInput = '';
let operation = null;

// Fonction pour ajouter un chiffre à l'écran
function appendNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number;
        updateScreen();
    }
}

// Fonction pour définir l'opération
function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

// Fonction pour calculer le résultat
function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                alert('Division par zéro impossible.');
                clearScreen();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    addToHistory(`${prev} ${getOperationSymbol(operation)} ${current} = ${result}`);
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateScreen();
}

// Fonction pour effacer l'écran
function clearScreen() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateScreen();
}

// Fonction pour mettre à jour l'écran
function updateScreen() {
    const screen = document.getElementById('screen');
    screen.textContent = currentInput || '0';
}

// Fonction pour ajouter un calcul à l'historique
function addToHistory(entry) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}

// Fonction pour obtenir le symbole de l'opération
function getOperationSymbol(op) {
    switch (op) {
        case 'add':
            return '+';
        case 'subtract':
            return '−';
        case 'multiply':
            return '×';
        case 'divide':
            return '÷';
        default:
            return '';
    }
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
