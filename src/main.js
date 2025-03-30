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

const questions = [
    {
        question: "Quel est le but principal d'un pare-feu ?",
        options: [
            { text: "Bloquer les virus", value: "a" },
            { text: "Contrôler le trafic réseau", value: "b" },
            { text: "Sauvegarder les données", value: "c" }
        ],
        correct: "b"
    },
    {
        question: "Que signifie le terme 'phishing' ?",
        options: [
            { text: "Une attaque par mot de passe", value: "a" },
            { text: "Une tentative de vol d'informations", value: "b" },
            { text: "Une attaque par déni de service", value: "c" }
        ],
        correct: "b"
    },
    {
        question: "Quelle est la méthode la plus sûre pour protéger un mot de passe ?",
        options: [
            { text: "Le noter sur un papier", value: "a" },
            { text: "Utiliser un gestionnaire de mots de passe", value: "b" },
            { text: "Le mémoriser uniquement", value: "c" }
        ],
        correct: "b"
    },
    {
        question: "Que signifie HTTPS dans une URL ?",
        options: [
            { text: "HyperText Transfer Protocol Secure", value: "a" },
            { text: "HyperText Transfer Protocol Standard", value: "b" },
            { text: "HyperText Transfer Protocol Simple", value: "c" }
        ],
        correct: "a"
    },
    {
        question: "Quelle est la meilleure pratique pour éviter les ransomwares ?",
        options: [
            { text: "Ne jamais ouvrir les pièces jointes d'e-mails suspects", value: "a" },
            { text: "Installer un antivirus", value: "b" },
            { text: "Utiliser un VPN", value: "c" }
        ],
        correct: "a"
    }
];

let currentQuestionIndex = 0;
let score = 0; // Initialisation du score

function showQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Efface la question précédente

    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];

        // Affiche la question
        const questionElement = document.createElement("p");
        questionElement.className = "font-semibold";
        questionElement.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
        quizContainer.appendChild(questionElement);

        // Affiche les options
        questionData.options.forEach(option => {
            const label = document.createElement("label");
            label.className = "block mt-2";
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.value = option.value;
            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${option.text}`));
            quizContainer.appendChild(label);
        });

        // Conteneur pour les boutons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex items-center space-x-4 mt-4";

        // Bouton Correction
        const correctionButton = document.createElement("button");
        correctionButton.textContent = "Correction";
        correctionButton.className = "btn py-2 rounded-lg";
        correctionButton.onclick = () => checkAnswer(correctionButton, buttonContainer);
        buttonContainer.appendChild(correctionButton);

        quizContainer.appendChild(buttonContainer);
    } else {
        // Affiche le score final
        const resultDiv = document.createElement("p");
        resultDiv.textContent = `Vous avez terminé le questionnaire avec un score de ${score} sur ${questions.length}. (4/5 nécessaire pour me contacter)`;
        resultDiv.className = "text-lg font-bold text-green-500 text-center mx-auto"; // Centrage du texte
        quizContainer.appendChild(resultDiv);

        // Affiche le tableau des questions et réponses
        const table = document.createElement("table");
        table.className = "table-auto border-collapse border border-gray-600 mt-6 mx-auto text-gray-100";

        // En-tête du tableau
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        ["Question", "Réponse Correcte"].forEach(headerText => {
            const th = document.createElement("th");
            th.className = "border border-gray-600 px-4 py-2";
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Corps du tableau
        const tbody = document.createElement("tbody");
        questions.forEach((question, index) => {
            const row = document.createElement("tr");

            // Colonne Question
            const questionCell = document.createElement("td");
            questionCell.className = "border border-gray-600 px-4 py-2";
            questionCell.textContent = `${index + 1}. ${question.question}`;
            row.appendChild(questionCell);

            // Colonne Réponse Correcte
            const answerCell = document.createElement("td");
            answerCell.className = "border border-gray-600 px-4 py-2";
            const correctOption = question.options.find(option => option.value === question.correct);
            answerCell.textContent = correctOption.text;
            row.appendChild(answerCell);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        quizContainer.appendChild(table);

        // Si le score est supérieur ou égal à 4, affiche le formulaire de contact sous le tableau
        if (score >= 4) {
            const contactForm = document.createElement("div");
            contactForm.className = "bg-gray-700 p-6 rounded-lg shadow-lg mt-6 mx-auto max-w-md";

            // Titre du formulaire
            const formTitle = document.createElement("h3");
            formTitle.textContent = "Formulaire de Contact";
            formTitle.className = "text-xl font-bold text-white mb-4 text-center";
            contactForm.appendChild(formTitle);

            // Champ Nom
            const nameField = document.createElement("input");
            nameField.type = "text";
            nameField.placeholder = "Nom";
            nameField.className = "w-full p-2 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-white";
            nameField.id = "name";
            contactForm.appendChild(nameField);

            // Champ Prénom
            const firstNameField = document.createElement("input");
            firstNameField.type = "text";
            firstNameField.placeholder = "Prénom";
            firstNameField.className = "w-full p-2 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-white";
            firstNameField.id = "firstName";
            contactForm.appendChild(firstNameField);

            // Champ Email
            const emailField = document.createElement("input");
            emailField.type = "email";
            emailField.placeholder = "Email";
            emailField.className = "w-full p-2 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-white";
            emailField.id = "email";
            contactForm.appendChild(emailField);

            // Champ Message
            const messageField = document.createElement("textarea");
            messageField.placeholder = "Message";
            messageField.className = "w-full p-2 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-white";
            messageField.id = "message";
            contactForm.appendChild(messageField);

            // Bouton Envoyer
            const sendButton = document.createElement("button");
            sendButton.textContent = "Envoyer";
            sendButton.className = "btn bg-blue-500 text-white px-4 py-2 rounded-lg w-full";
            sendButton.onclick = () => {
                const name = document.getElementById("name").value;
                const firstName = document.getElementById("firstName").value;
                const email = document.getElementById("email").value;
                const message = document.getElementById("message").value;

                // Construction de l'URL mailto
                const mailtoLink = `mailto:gabriel.pillegand@epita.fr?subject=Contact%20de%20${firstName}%20${name}&body=${encodeURIComponent(
                    `Nom: ${name}\nPrénom: ${firstName}\nEmail: ${email}\n\nMessage:\n${message}`
                )}`;
                window.location.href = mailtoLink;
            };
            contactForm.appendChild(sendButton);

            quizContainer.appendChild(contactForm);
        }
    }
}

function checkAnswer(correctionButton, buttonContainer) {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Veuillez sélectionner une réponse !");
        return;
    }

    const answer = selectedOption.value;
    const questionData = questions[currentQuestionIndex];

    // Désactive toutes les options après la soumission
    const options = document.querySelectorAll('input[name="answer"]');
    options.forEach(option => option.disabled = true);

    if (answer === questionData.correct) {
        correctionButton.textContent = "Correct !";
        correctionButton.className = "btn bg-green-500 text-white px-4 py-2 rounded-lg";
        correctionButton.disabled = true;

        // Incrémente le score
        score++;
    } else {
        correctionButton.textContent = "Faux !";
        correctionButton.className = "btn bg-red-500 text-white px-4 py-2 rounded-lg";
        correctionButton.disabled = true;
    }

    // Conteneur pour aligner les boutons
    const buttonAlignmentContainer = document.createElement("div");
    buttonAlignmentContainer.className = "flex items-center space-x-4 mt-4";

    // Bouton Prochaine Question ou Résultat
    const nextButton = document.createElement("button");
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Résultat" : "Prochaine Question";
    nextButton.className = "btn bg-blue-500 text-white px-4 py-2 rounded-lg";
    nextButton.onclick = () => {
        currentQuestionIndex++;
        showQuestion();
    };

    // Ajoute les boutons au conteneur d'alignement
    buttonAlignmentContainer.appendChild(correctionButton);
    buttonAlignmentContainer.appendChild(nextButton);

    // Ajoute le conteneur d'alignement au conteneur principal
    buttonContainer.appendChild(buttonAlignmentContainer);
}

// Affiche la première question
showQuestion();