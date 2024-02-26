const questions = [
  {
    question:
      "What was the name of the first locomotive to carry both passengers and goods in the world?",
    answers: [
      { text: "Steam locomotive", correct: false },
      { text: "Locomotion no.1", correct: true },
      { text: "Rocket", correct: false },
      { text: "Limmat", correct: false },
    ],
  },
  {
    question: "Who invented the first steam engine?",
    answers: [
      { text: "Thomas Savery", correct: true },
      { text: "George Stephenson", correct: false },
      { text: "Richard Trevithick", correct: false },
      { text: "Charles Fox", correct: false },
    ],
  },
  {
    question: "When did the first steam train touch the South African soil?",
    answers: [
      { text: "1880", correct: false },
      { text: "1853", correct: false },
      { text: "1860", correct: true },
      { text: "Early 1900s", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  answerButton.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; // Increment score if the answer is correct
    console.log("Current score", score);
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
