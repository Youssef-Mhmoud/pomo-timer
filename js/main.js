const DEFAULT_TIME = 1500; // seconds
let timeLeft = DEFAULT_TIME;
let interval;

// Variables
const buttons = {
  start: document.querySelector(".start"),
  pause: document.querySelector(".pause"),
  reset: document.querySelector(".reset"),
  continue: document.querySelector(".continue"),
  navBtns: document.querySelectorAll(".time-box nav button")
};

const timeEl = document.querySelector(".time");
const boxTimeEl = document.querySelector(".time-box");
const timeControlEl = document.querySelector(".time-control");

// Add active class to button
buttons.navBtns.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    buttons.navBtns.forEach((btn) => btn.classList.remove("active-nav"));
    e.target.classList.add("active-nav");
  });
});

// Utility functions
const hide = (el) => (el.style.display = "none");
const show = (el, type = "block") => (el.style.display = type);

// Time functions logic
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

  hide(e.target);
  show(buttons.pause);
  show(timeControlEl, "flex");
}

function pauseTimer(e) {
  clearInterval(interval);

  show(buttons.continue);
  hide(e.target);
}

function resetTimer(e) {
  clearInterval(interval);
  timeLeft = 1500;
  updateTimer();

  hide(timeControlEl);
  show(buttons.start);
}

buttons.start.addEventListener("click", startTimer);

buttons.continue.addEventListener("click", startTimer);

buttons.pause.addEventListener("click", pauseTimer);

buttons.reset.addEventListener("click", resetTimer);
