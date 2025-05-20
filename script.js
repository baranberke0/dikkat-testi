const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");

const infoBox = document.getElementById("info-box");
const countdown = document.getElementById("countdown");
const countdownBar = document.getElementById("countdown-bar");
const countdownProgress = document.getElementById("countdown-progress");

const userInput = document.getElementById("user-input");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const levelDisplay = document.getElementById("level");

let randomCode = "";
let score = 0;
let attempts = 0;
let currentLevel = 3;

let gameActive = false;

function generateRandomCode(length = 3) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

function startGame() {
  if (!gameActive) return;
  feedback.textContent = "";
  userInput.value = "";

  randomCode = generateRandomCode(currentLevel);
  infoBox.textContent = randomCode;

  infoBox.classList.remove("hidden");
  countdown.classList.remove("hidden");
  countdownBar.classList.remove("hidden");

  submitBtn.classList.add("hidden");
  userInput.classList.add("hidden");

  levelDisplay.textContent = currentLevel;

  let timeLeft = 2;
  const totalTime = timeLeft;

  countdown.textContent = `Görsel kapanıyor: ${timeLeft}`;
  countdownProgress.style.width = "100%";

  const timer = setInterval(() => {
    timeLeft--;
    countdown.textContent = `Görsel kapanıyor: ${timeLeft}`;

    const percent = (timeLeft / totalTime) * 100;
    countdownProgress.style.width = percent + "%";

    if (timeLeft === 0) {
      clearInterval(timer);
      infoBox.classList.add("hidden");
      countdown.classList.add("hidden");
      countdownBar.classList.add("hidden");

      userInput.classList.remove("hidden");
      submitBtn.classList.remove("hidden");
      userInput.focus();
    }
  }, 1000);
}

function checkAnswer() {
  if (!gameActive) return;

  const answer = userInput.value.trim();
  attempts++;

  if (answer === randomCode) {
    feedback.textContent = "✅ Doğru tahmin!";
    score++;
    if (score % 3 === 0 && currentLevel < 10) {
      currentLevel++;
      levelDisplay.textContent = currentLevel;
    }
  } else {
    feedback.textContent = `❌ Yanlış. Doğru cevap: ${randomCode}`;
  }

  scoreDisplay.textContent = score;
  attemptsDisplay.textContent = attempts;

  submitBtn.classList.add("hidden");
  userInput.classList.add("hidden");

  // 1 saniye sonra oyunu tekrar başlat
  setTimeout(() => {
    if (gameActive) {
      startGame();
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  gameActive = true;
  score = 0;
  attempts = 0;
  currentLevel = 3;
  scoreDisplay.textContent = score;
  attemptsDisplay.textContent = attempts;
  levelDisplay.textContent = currentLevel;

  startBtn.classList.add("hidden");
  feedback.textContent = "";
  startGame();
});

submitBtn.addEventListener("click", checkAnswer);
