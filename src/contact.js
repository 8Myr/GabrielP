function scrollToTop() {  // Permet de retourner en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

let questions = []; // Contiendra toutes les questions chargées
let currentQuestionIndex = 0; // L'index de la question actuelle
let score = 0; // Score de l'utilisateur

async function loadQuestions() { // Chargmement des question depuis le fichier questions.json
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error(`Erreur : ${response.status}`);
        questions = await response.json();
        showQuestion();
    } catch (error) {
        console.error(error);
        alert("Impossible de charger les questions.");
    }
}

function showQuestion() { // affichage de la question actuelle + boutons
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];

        const questionElement = document.createElement("p");
        questionElement.className = "font-semibold";
        questionElement.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
        quizContainer.appendChild(questionElement);

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

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex flex-row items-center space-x-4 mt-4";

        const correctionButton = document.createElement("button");
        correctionButton.textContent = "Correction";
        correctionButton.className = "btn px-4 py-2 rounded-[1rem] text-white transition duration-200";
        correctionButton.style.backgroundColor = "#004B74";
        correctionButton.onmouseover = () => correctionButton.style.backgroundColor = "#036797";
        correctionButton.onmouseout = () => correctionButton.style.backgroundColor = "#004B74";

        correctionButton.onclick = () => {
            const selected = document.querySelector('input[name="answer"]:checked');
            if (!selected) return alert("Sélectionnez une réponse !");
            const isCorrect = selected.value === questionData.correct;
            handleAnswerResult(isCorrect, correctionButton, buttonContainer);
        };
        buttonContainer.appendChild(correctionButton);

        const autoAnswerBtn = document.createElement("button");
        autoAnswerBtn.textContent = "BruteForce";
        autoAnswerBtn.className = "btn px-4 py-2 rounded-[1rem] text-white transition duration-200";
        autoAnswerBtn.style.backgroundColor = "#004B74";
        autoAnswerBtn.onmouseover = () => autoAnswerBtn.style.backgroundColor = "#036797";
        autoAnswerBtn.onmouseout = () => autoAnswerBtn.style.backgroundColor = "#004B74";

        autoAnswerBtn.onclick = autoAnswerQuiz;
        buttonContainer.appendChild(autoAnswerBtn);

        quizContainer.appendChild(buttonContainer);
    } else {
        showFinalResult();
    }
}


function handleAnswerResult(isCorrect, correctionButton, buttonContainer) { // Si la question est correcte, désactive les options et propose un bouton pour passer à la question suivante sinon permet de rééssayer.
    const allInputs = document.querySelectorAll('input[name="answer"]');
    const oldMessage = buttonContainer.querySelector(".feedback-message");
    if (oldMessage) oldMessage.remove();

    const feedbackMessage = document.createElement("p");
    feedbackMessage.className = "mt-2 font-bold feedback-message";

    if (isCorrect) {
        correctionButton.className = "btn bg-green-500 text-white px-4 py-2 rounded-lg";
        score++;

        feedbackMessage.textContent = "Bonne réponse !";
        feedbackMessage.classList.add("text-green-500");

        allInputs.forEach(opt => opt.disabled = true);
        correctionButton.disabled = true;

        const nextButton = document.createElement("button");
        nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Résultat" : "Prochaine Question";
        nextButton.className = "btn bg-blue-500 text-white px-4 py-2 rounded-lg";
        nextButton.onclick = () => {
            currentQuestionIndex++;
            showQuestion();
        };
        buttonContainer.appendChild(nextButton);
    } else {
        correctionButton.className = "btn bg-red-500 text-white px-4 py-2 rounded-lg";
        feedbackMessage.textContent = "Mauvaise réponse. Réessayez.";
        feedbackMessage.classList.add("text-red-500");
        // Réponses toujours actives pour réessayer
    }

    buttonContainer.appendChild(feedbackMessage);
}

function showFinalResult() { // Affiche le score final, le tableau avec les questions et les corrections et le formulaire de contact si score >= 4
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    const resultDiv = document.createElement("p");
    resultDiv.textContent = `Vous avez terminé le questionnaire avec un score de ${score} sur ${questions.length}. (4/5 nécessaire pour me contacter)`;
    resultDiv.className = "text-lg font-bold text-green-500 text-center mx-auto";
    quizContainer.appendChild(resultDiv);

    const table = document.createElement("table");
    table.className = "table-auto border-collapse border border-gray-600 mt-6 mx-auto text-gray-100";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Question", "Réponse Correcte"].forEach(text => {
        const th = document.createElement("th");
        th.className = "border border-gray-600 px-4 py-2";
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    questions.forEach((q, index) => {
        const row = document.createElement("tr");
        const qCell = document.createElement("td");
        qCell.className = "border border-gray-600 px-4 py-2";
        qCell.textContent = `${index + 1}. ${q.question}`;
        row.appendChild(qCell);

        const aCell = document.createElement("td");
        aCell.className = "border border-gray-600 px-4 py-2";
        const correctOption = q.options.find(opt => opt.value === q.correct);
        aCell.textContent = correctOption.text;
        row.appendChild(aCell);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    quizContainer.appendChild(table);

    if (score >= 4) {
        const form = document.createElement("div");
        form.className = "bg-gray-700 p-6 rounded-lg shadow-lg mt-6 mx-auto max-w-md";

        const title = document.createElement("h3");
        title.textContent = "Formulaire de Contact";
        title.className = "text-xl font-bold text-white mb-4 text-center";
        form.appendChild(title);

        ["Nom", "Prénom", "Email", "Message"].forEach((ph, idx) => {
            const input = idx < 3 ? document.createElement("input") : document.createElement("textarea");
            input.placeholder = ph;
            input.className = "w-full p-2 mb-4 rounded-lg border border-gray-600 bg-gray-800 text-white";
            input.id = ph.toLowerCase();
            form.appendChild(input);
        });

        const sendBtn = document.createElement("button"); // Envoie un mail via un lien mailto: avec les infos du formulaire
        sendBtn.textContent = "Envoyer";
        sendBtn.className = "btn bg-blue-500 text-white px-4 py-2 rounded-lg w-full";
        sendBtn.onclick = () => {
            const name = document.getElementById("nom").value;
            const firstName = document.getElementById("prénom").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            const mailtoLink = `mailto:mail.mail@mail.mail?subject=Contact%20de%20${firstName}%20${name}&body=${encodeURIComponent(`Nom: ${name}\nPrénom: ${firstName}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;
        };
        form.appendChild(sendBtn);
        quizContainer.appendChild(form);
    }
}

async function autoAnswerQuiz() { // Charge les questions si pas encore fait
    if (!questions.length) {
        await loadQuestions();
        return;
    }

    async function bruteForceQuestion() { // Tente chaque option jusqu'a trouver la bonne et passe ensuite à la question suivante
        if (currentQuestionIndex >= questions.length) {
            showFinalResult();
            return;
        }

        const questionData = questions[currentQuestionIndex];
        const options = document.querySelectorAll('input[name="answer"]');
        let i = 0;

        function tryOption() {
            if (i >= options.length) {
                currentQuestionIndex++;
                showQuestion();
                setTimeout(bruteForceQuestion, 400);
                return;
            }

            const option = options[i];
            option.checked = true;

            const label = option.parentNode;
            // Appliquer des styles améliorés
            label.style.backgroundColor = "#1E40AF"; // Un bleu foncé pour l'option sélectionnée
            label.style.color = "#fff";  // Texte blanc pour plus de contraste
            label.style.padding = "8px";
            label.style.borderRadius = "4px";
            label.style.transition = "background-color 0.3s ease";

            const isCorrect = option.value === questionData.correct;

            if (isCorrect) {
                score++;
                currentQuestionIndex++;
                setTimeout(() => {
                    showQuestion();
                    setTimeout(bruteForceQuestion, 400);
                }, 400);
            } else {
                i++;
                setTimeout(tryOption, 200);
            }
        }

        tryOption();
    }

    bruteForceQuestion();
}

loadQuestions(); // Lance le questionnaire au chargement de la page
