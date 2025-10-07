const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const quizContainer = document.getElementById('quiz-container');

function showQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <div class="score">Score: ${score}/${questions.length}</div>
    <div class="question">${q.question}</div>
    <div class="options">
      ${q.options.map((opt, i) => `<button class="option-btn" onclick="selectOption(${i})">${opt}</button>`).join('')}
    </div>
    <button class="next-btn" id="next-btn" disabled>Next</button>
  `;
  selectedOption = null;
  document.getElementById('next-btn').addEventListener('click', nextQuestion);
}

function selectOption(index) {
  if (selectedOption !== null) return;
  selectedOption = index;
  const q = questions[currentQuestion];
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach((btn, i) => {
    btn.classList.remove('selected', 'correct', 'wrong');
    if (i === index) btn.classList.add('selected');
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === index) btn.classList.add('wrong');
  });
  if (index === q.answer) score++;
  document.getElementById('next-btn').disabled = false;
  document.getElementById('next-btn').classList.add('enabled');
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.innerHTML = `
    <div class="result-screen">
      <div class="quiz-title">Quiz Results</div>
      <div class="score">Your Score: ${score}/${questions.length}</div>
      <button class="play-again-btn" onclick="playAgain()">Play Again</button>
    </div>
  `;
}

function playAgain() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

window.onload = showQuestion;
