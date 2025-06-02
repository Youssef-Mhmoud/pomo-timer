const DEFAULT_TIME = 1500; // seconds
let timeLeft = DEFAULT_TIME;
let interval;

// Variables
const buttons = {
  start: document.querySelector(".start"),
  pause: document.querySelector(".pause"),
  reset: document.querySelector(".reset"),
  continue: document.querySelector(".continue"),
  navBtns: document.querySelectorAll(".time-box nav button"),
};

const alarmSound = document.getElementById("alarm-sound");

const timeEl = document.querySelector(".time");
const boxTimeEl = document.querySelector(".time-box");
const timeControlEl = document.querySelector(".time-control");

// Utility functions
const hide = (el) => (el.style.display = "none");
const show = (el, type = "block") => (el.style.display = type);

// Time functions logic
function updateTimer(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timeEl.innerHTML = formattedTime;
}

function startTimer(e) {
  if (interval) return;

  interval = setInterval(() => {
    timeLeft--;
    updateTimer(timeLeft);

    if (timeLeft === 0) {
      clearInterval(interval);
      interval = null;

      alarmSound.currentTime = 0;
      alarmSound.play();

      hide(buttons.pause);
    }
  }, 1000);

  hide(e.target);
  show(buttons.pause);
  show(timeControlEl, "flex");
}

function pauseTimer(e) {
  clearInterval(interval);
  interval = null;

  show(buttons.continue);
  hide(e.target);
}

function stopTimerUI() {
  clearInterval(interval);
  interval = null;

  hide(timeControlEl);
  hide(buttons.continue);
  show(buttons.start);
}

function resetTimer(e) {
  timeLeft = DEFAULT_TIME;

  stopTimerUI();
  updateTimer(timeLeft);
}

updateTimer(timeLeft);

// Events

buttons.start.addEventListener("click", startTimer);

buttons.continue.addEventListener("click", startTimer);

buttons.pause.addEventListener("click", pauseTimer);

buttons.reset.addEventListener("click", resetTimer);

// Add active class to button
buttons.navBtns.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    buttons.navBtns.forEach((btn) => btn.classList.remove("active-nav"));
    e.target.classList.add("active-nav");

    // Change time
    if (e.target.classList.contains("short-break-btn")) timeLeft = 300;

    if (e.target.classList.contains("long-break-btn")) timeLeft = 900;

    if (e.target.classList.contains("focus-btn")) timeLeft = DEFAULT_TIME;

    updateTimer(timeLeft);
    stopTimerUI();
  });
});
