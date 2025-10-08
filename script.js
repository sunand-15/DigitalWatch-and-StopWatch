const display = document.querySelector("#stopwatchDisplay");
const startStopBtn = document.querySelector("#startStopBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const laps = document.querySelector("#laps");

function updateClock() {
  let now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let second = String(now.getUTCSeconds()).padStart(2, "0");
  document.querySelector(
    "#digitalClock"
  ).textContent = `${hours} : ${minutes}:${second}`;
}
setInterval(updateClock, 1000);
updateClock();

// STOPWATCH
let stopwatchInterval;
let elapsedTime = 0;
let running = false;

function updateStopwatch() {
  const ms = elapsedTime % 1000;
  const totalsecond = Math.floor(elapsedTime % 1000);
  const secs = totalsecond % 60;
  const mins = Math.floor(totalsecond / 60);
  display.textContent = `${String(mins).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}:${String(Math.floor(ms / 10)).padStart(2, "0")}`;
}
startStopBtn.addEventListener("click", () => {
  if (!running) {
    // start
    running = true;
    let lastTime = Date.now();
    stopwatchInterval = setInterval(() => {
      const now = Date.now();
      elapsedTime += now - lastTime;
      lastTime = now;
      updateStopwatch();
    }, 20);
    startStopBtn.textContent = "Stop";
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  } else {
    // stop
    running = false;
    clearInterval(stopwatchInterval);
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
  }
});
lapBtn.addEventListener("click", () => {
  const lapTime = document.createElement("div");
  lapTime.textContent = display.textContent;
  laps.prepend(lapTime); // latest lap at top
});

    resetBtn.addEventListener("click", () => {
      clearInterval(stopwatchInterval);
      running = false;
      elapsedTime = 0;
      updateStopwatch();
      startStopBtn.textContent = "Start";
      resetBtn.disabled = true;
      lapBtn.disabled = true;
      laps.innerHTML = "";
    });
    updateStopwatch();
