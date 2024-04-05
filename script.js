const questions = [
    {
        question: "Você tem alguma dessas doenças?",
        answers:[
            //Tenho que determinar valores para as respostas para definir qual será
            // a prox pergunta. Devo usar value?
            {text: "Cardíaca", correct: true},
            {text: "Respiratória", correct: false},
            {text: "Endócrina", correct: false},
            {text: "Neoplasia (Câncer)", correct: false},
            {text: "Dermato", correct: false},
        ]
    },
    {
        question: "Doenças cardiacas:",
        answers:[
            //Tenho que determinar valores para as respostas para definir qual será
            // a prox pergunta. Devo usar value?
            {text: "Miopatia", correct: true},
            {text: "Angina", correct: false},
            {text: "Infarto", correct: false},
            {text: "Neoplasia (Câncer)", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Esta função zera as perguntas e o score do quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Continuar"
    showQuestion();
}

// Esta função dá continuidade para a próx pergunta
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++; //Aumenta o score em 1. Posso dar valor as respostas e usar isso como criterio para decidir qual será a próx pergunta
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
        
    });
    nextButton.style.display = "block";
}

function showScore (){
    resetState();
    questionElement.innerHTML = `Seu score ${score} foi ${questions.length}`;
    nextButton.innerHTML = "Tentar novamente";
    nextButton.style.display = "block";
}

function handleNextButton (){
    currentQuestionIndex ++; //Aumenta o index da pergunta em uma unidade
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();    
    }
})

startQuiz();