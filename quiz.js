// script.js
const quizQuestions = [
  {
    question: "Who directed the movie 'Inception'?",
    answers: [
      "Christopher Nolan",
      "Steven Spielberg",
      "James Cameron",
      "Quentin Tarantino",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which year was 'The Godfather' released?",
    answers: ["1972", "1980", "1990", "1965"],
    correctAnswer: 0,
  },
  // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const questionCountElement = document.getElementById("question-count");
const pointsElement = document.getElementById("points");
const restartButton = document.getElementById("restart-btn");

let correctCount = 0;
let wrongCount = 0;
let skippedCount = 0;
let totalTimeTaken = 0; // To calculate time taken

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  skippedCount = 0;
  timeLeft = 10; // Reset timer for each question
  pointsElement.textContent = score; // Reset points display
  resultContainer.style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion();
  startTimer();
}
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      showScore();
    } else {
      timeLeft--;
      timerElement.textContent = `${timeLeft}`;
    }
  }, 1000);
}
function loadQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    showScore();
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <p>${currentQuestion.question}</p>
    ${currentQuestion.answers
      .map(
        (answer, index) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="answer" value="${index}" id="answer${index}">
          <label class="form-check-label" for="answer${index}">${answer}</label>
        </div>
      `
      )
      .join("")}
  `;

  questionCountElement.textContent = `${currentQuestionIndex + 1}/${
    quizQuestions.length
  }`;
}

nextButton.addEventListener("click", () => {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (selectedAnswer) {
    if (
      parseInt(selectedAnswer.value) ===
      quizQuestions[currentQuestionIndex].correctAnswer
    ) {
      correctCount++; // Count correct answers
      score++; // Increase score
      pointsElement.textContent = score;
    } else {
      wrongCount++; // Count wrong answers
    }
  } else {
    skippedCount++; // If no answer is selected, count as skipped
  }

  currentQuestionIndex++;
  loadQuestion();
});

function showScore() {
  clearInterval(timer);
  totalTimeTaken = 10 * quizQuestions.length - timeLeft; // Calculate total time taken
  document.getElementById("quiz-container").style.display = "none";
  resultContainer.style.display = "block";
  scoreElement.textContent = `${score}`;
  document.getElementById("correct-count").textContent = correctCount;
  document.getElementById("skipped-count").textContent = skippedCount;
  document.getElementById("wrong-count").textContent = wrongCount;
}

restartButton.addEventListener("click", startQuiz);

window.onload = startQuiz;
