const questions = [
        {
            question: "Which is larget animale in world?",
            answers: [
                { text: "Shark" , correct: false},
                { text: "Blue whale" , correct: true},
                { text: "Elephant" , correct: false},
                { text: "Giraffe" , correct: false},
            ],
        },

        {
            question: "What Is The Capital Of Palestine?",
            answers: [
                { text: "Nablus" , correct: false},
                { text: "Ramallah" , correct: false},
                { text: "Jerusalem" , correct: true},
                { text: "Jericho" , correct: false},
            ],
        },

        {
            question: "ما هي أطول سورة مدنية في عدد آياتها؟	",
            answers: [
                { text: "الكهف" , correct: false},
                { text: "ال عمران" , correct: false},
                { text: "المائدة" , correct: false},
                { text: "البقرة" , correct: true},
            ],
        },

        {
            question: "Who invented javascript language?",
            answers: [
                { text: "Moath Husein" , correct: false},
                { text: "Blue whale" , correct: false},
                { text: "James Gosling" , correct: true},
                { text: "Giraffe" , correct: false},
            ],
        }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        button.addEventListener("click", () => selectAnswer(answer.correct, button));
    });
}

function resetState() {
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
    nextButton.style.display = "none";
}

function selectAnswer(isCorrect, selectedBtn) {
    if (answered) {
        return;
    }

    answered = true;

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach((button) => {
        if (button !== selectedBtn) {
            button.disabled = true; 
        }
    });

    nextButton.style.display = "block";
}

function handelNextButton() {
    answered = false;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handelNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();