// Variables
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const continueBtn = document.querySelector(".continue");
const resetBtn = document.querySelector(".reset");
const navBtns = document.querySelectorAll(".time-box nav button");
const timeEl = document.querySelector(".time");
const boxTimeEl = document.querySelector(".time-box");
const timeControlEl = document.querySelector(".time-control");

// Add active class to button
navBtns.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    navBtns.forEach((btn) => btn.classList.remove("active-nav"));
    e.target.classList.add("active-nav");
  });
});

// Time functions logic
let interval;
let timeLeft = 1500; // seconds

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timeEl.innerHTML = formattedTime;
}

function startTimer(e) {
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(interval);
    }
  }, 1000);

    e.target.style.display = "none";
    pauseBtn.style.display = 'block'
    timeControlEl.style.display = "flex";

}

function pauseTimer(e) {
  clearInterval(interval);
  continueBtn.style.display = "block";

  e.target.style.display = "none";
}

function resetTimer(e) {
  clearInterval(interval)
  timeLeft = 1500
  updateTimer()

  timeControlEl.style.display = 'none'
  startBtn.style.display = 'block'
}

startBtn.addEventListener("click", startTimer);

continueBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);
