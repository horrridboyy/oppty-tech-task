const questions = [
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google", "Oracle"],
    answer: 0,
  },
  {
    question: "Which keyword is used to declare a block-scoped variable?",
    options: ["var", "let", "constant", "define"],
    answer: 1,
  },
  {
    question: "Which method converts JSON text into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
    answer: 1,
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Mapping", "Dynamic Object Method", "Document Order Model"],
    answer: 0,
  },
  {
    question: "Which operator checks value and type equality?",
    options: ["=", "==", "===", "!="],
    answer: 2,
  },
  {
    question: "Which array method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer: 0,
  },
  {
    question: "Which loop keeps running while a condition is true?",
    options: ["for", "while", "switch", "repeat"],
    answer: 1,
  },
  {
    question: "Which keyword returns a value from a function?",
    options: ["break", "yield", "return", "send"],
    answer: 2,
  },
  {
    question: "Which event is fired when a button is clicked?",
    options: ["hover", "click", "submit", "load"],
    answer: 1,
  },
  {
    question: "Which method writes a message to the browser console?",
    options: ["console.write()", "console.log()", "console.show()", "console.print()"],
    answer: 1,
  },
];

const state = {
  started: false,
  currentQuestionIndex: 0,
  selectedAnswers: Array(questions.length).fill(null),
  submitted: false,
};

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startQuizBtn = document.getElementById("startQuizBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const restartQuizBtn = document.getElementById("restartQuizBtn");
const bestScorePill = document.getElementById("bestScorePill");
const questionCounter = document.getElementById("questionCounter");
const questionPercent = document.getElementById("questionPercent");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const scorePercent = document.getElementById("scorePercent");
const totalQuestionsValue = document.getElementById("totalQuestionsValue");
const correctAnswersValue = document.getElementById("correctAnswersValue");
const wrongAnswersValue = document.getElementById("wrongAnswersValue");
const scoreFraction = document.getElementById("scoreFraction");
const performanceMessage = document.getElementById("performanceMessage");

function getStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    
  }
}

function getBestScore() {
  const storedBest = Number(getStoredValue("quiz-best-score"));
  return Number.isFinite(storedBest) ? storedBest : 0;
}

function showScreen(screenName) {
  welcomeScreen.classList.add("is-hidden");
  quizScreen.classList.add("is-hidden");
  resultScreen.classList.add("is-hidden");

  if (screenName === "welcome") {
    welcomeScreen.classList.remove("is-hidden");
  }

  if (screenName === "quiz") {
    quizScreen.classList.remove("is-hidden");
  }

  if (screenName === "result") {
    resultScreen.classList.remove("is-hidden");
  }
}

function updateBestScorePill() {
  bestScorePill.textContent = `Best: ${getBestScore()}%`;
}

function startQuiz() {
  state.started = true;
  state.submitted = false;
  state.currentQuestionIndex = 0;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = questions[state.currentQuestionIndex];
  const currentSelection = state.selectedAnswers[state.currentQuestionIndex];

  questionCounter.textContent = `Question ${state.currentQuestionIndex + 1} of ${questions.length}`;
  questionPercent.textContent = `${Math.round(((state.currentQuestionIndex + 1) / questions.length) * 100)}%`;
  progressFill.style.width = `${((state.currentQuestionIndex + 1) / questions.length) * 100}%`;
  questionText.textContent = currentQuestion.question;
  totalQuestionsValue.textContent = String(questions.length);

  optionsContainer.innerHTML = currentQuestion.options
    .map((option, optionIndex) => {
      const selectedClass = currentSelection === optionIndex ? " selected" : "";

      return `
        <button type="button" class="option-btn${selectedClass}" data-option-index="${optionIndex}">
          <span class="option-dot" aria-hidden="true"></span>
          <span class="option-text">${option}</span>
        </button>
      `;
    })
    .join("");

  prevBtn.disabled = state.currentQuestionIndex === 0;
  nextBtn.classList.toggle("is-hidden", state.currentQuestionIndex === questions.length - 1);
  submitBtn.classList.toggle("is-hidden", state.currentQuestionIndex !== questions.length - 1);
}

function selectAnswer(optionIndex) {
  state.selectedAnswers[state.currentQuestionIndex] = optionIndex;
  renderQuestion();
}

function goNext() {
  if (state.currentQuestionIndex < questions.length - 1) {
    state.currentQuestionIndex += 1;
    renderQuestion();
  }
}

function goPrevious() {
  if (state.currentQuestionIndex > 0) {
    state.currentQuestionIndex -= 1;
    renderQuestion();
  }
}

function buildPerformanceMessage(scorePercentage) {
  if (scorePercentage >= 90) {
    return {
      title: "Excellent!",
      message: "You mastered the quiz and showed a strong command of JavaScript basics.",
    };
  }

  if (scorePercentage >= 70) {
    return {
      title: "Great Job!",
      message: "You did very well and only missed a few questions. Solid work.",
    };
  }

  if (scorePercentage >= 50) {
    return {
      title: "Good Effort!",
      message: "You have a fair grasp of the topic. A quick review would push your score higher.",
    };
  }

  return {
    title: "Keep Practicing!",
    message: "The quiz exposed a few gaps, but a second attempt will help you improve quickly.",
  };
}

function updateBestScore(scorePercentage) {
  const currentBest = getBestScore();

  if (scorePercentage > currentBest) {
    setStoredValue("quiz-best-score", String(scorePercentage));
  }
}

function submitQuiz() {
  const correctAnswers = questions.reduce((total, question, index) => {
    return total + (state.selectedAnswers[index] === question.answer ? 1 : 0);
  }, 0);

  const wrongAnswers = questions.length - correctAnswers;
  const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
  const performance = buildPerformanceMessage(scorePercentage);

  resultTitle.textContent = performance.title;
  resultMessage.textContent = "Your answers have been checked and your score is ready below.";
  scorePercent.textContent = `${scorePercentage}%`;
  correctAnswersValue.textContent = String(correctAnswers);
  wrongAnswersValue.textContent = String(wrongAnswers);
  scoreFraction.textContent = `${correctAnswers}/${questions.length}`;
  performanceMessage.textContent = performance.message;
  updateBestScore(scorePercentage);
  updateBestScorePill();

  const scoreRing = document.querySelector(".score-ring");
  const progressDegree = Math.max(0, Math.min(100, scorePercentage)) * 3.6;
  scoreRing.style.background = `
    radial-gradient(circle at center, var(--card-strong) 58%, transparent 59%),
    conic-gradient(var(--success) 0deg ${progressDegree}deg, rgba(147, 157, 192, 0.18) ${progressDegree}deg 360deg)
  `;

  state.submitted = true;
  showScreen("result");
}

function restartQuiz() {
  state.started = false;
  state.submitted = false;
  state.currentQuestionIndex = 0;
  state.selectedAnswers = Array(questions.length).fill(null);
  showScreen("welcome");
  updateBestScorePill();
  questionPercent.textContent = "10%";
  progressFill.style.width = "10%";
}

startQuizBtn.addEventListener("click", startQuiz);
prevBtn.addEventListener("click", goPrevious);
nextBtn.addEventListener("click", goNext);
submitBtn.addEventListener("click", submitQuiz);
restartQuizBtn.addEventListener("click", restartQuiz);

optionsContainer.addEventListener("click", (event) => {
  const optionButton = event.target.closest(".option-btn");

  if (!optionButton) {
    return;
  }

  const optionIndex = Number(optionButton.dataset.optionIndex);
  selectAnswer(optionIndex);
});

updateBestScorePill();
showScreen("welcome");
