//variable declarations
let breakDuration = document.querySelector("#break-length");
let sessionDuration = document.querySelector("#session-length");
const plusBreak = document.querySelector("#break-increment");
const minusBreak = document.querySelector("#break-decrement");
const plusSession = document.querySelector("#session-increment");
const minusSession = document.querySelector("#session-decrement");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const pausePlay = document.querySelector(".pause-play");
const reset = document.querySelector("#reset");
const timerLabel = document.querySelector("#timer-label");

let myInterval = -1;

//increase and decrease Break and Session durations
plusBreak.addEventListener("click", () => {
  if (myInterval == -1 && breakDuration.innerHTML < 60)
    breakDuration.innerHTML++;
  if (timerLabel.innerHTML == "break" && myInterval == -1) {
    clearInterval(myInterval);
    breakDuration.innerHTML < 10
      ? (minutes.innerHTML = "0" + breakDuration.innerHTML)
      : (minutes.innerHTML = breakDuration.innerHTML);
    seconds.innerHTML = "0" + 0;
  }
});
minusBreak.addEventListener("click", () => {
  if (breakDuration.innerHTML > 1 && myInterval == -1)
    breakDuration.innerHTML--;
  if (timerLabel.innerHTML == "break" && myInterval == -1) {
    clearInterval(myInterval);
    breakDuration.innerHTML < 10
      ? (minutes.innerHTML = "0" + breakDuration.innerHTML)
      : (minutes.innerHTML = breakDuration.innerHTML);
    seconds.innerHTML = "0" + 0;
  }
});
plusSession.addEventListener("click", () => {
  if (
    myInterval == -1 &&
    sessionDuration.innerHTML < 60 &&
    timerLabel.innerHTML !== "break"
  ) {
    sessionDuration.innerHTML++;
    minutes.innerHTML = sessionDuration.innerHTML;
    seconds.innerHTML = "0" + 0;
    if (minutes.innerHTML < 10) {
      minutes.innerHTML = "0" + minutes.innerHTML;
    }
  }
  if (timerLabel.innerHTML == "break" && myInterval == -1) {
    sessionDuration.innerHTML++;
  }
});
minusSession.addEventListener("click", () => {
  if (
    sessionDuration.innerHTML > 1 &&
    myInterval == -1 &&
    timerLabel.innerHTML !== "break"
  ) {
    sessionDuration.innerHTML--;
    minutes.innerHTML = sessionDuration.innerHTML;
    seconds.innerHTML = "0" + 0;
    if (minutes.innerHTML < 10) {
      minutes.innerHTML = "0" + minutes.innerHTML;
    }
  }
  if (
    timerLabel.innerHTML == "break" &&
    myInterval == -1 &&
    sessionDuration.innerHTML > 1
  ) {
    sessionDuration.innerHTML--;
  }
});

//countdown logic
pausePlay.addEventListener("click", () => {
  let minute = Number(minutes.innerHTML);
  let second = 60;
  //start/resume countdown
  if (myInterval == -1) {
    pausePlay.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
    second = seconds.innerHTML;
    myInterval = setInterval(() => {
      //seconds logic
      second--;
      if (second < 10) {
        second = "0" + second;
      }
      if (second == "0-1") {
        minute--;
        second = 59;
      }
      seconds.innerHTML = second;
      //minutes logic
      minute < 10
        ? (minutes.innerHTML = "0" + minute)
        : (minutes.innerHTML = minute);

      minutes.innerHTML == "00"
        ? (document.querySelector("#time-left").style.color = "brown")
        : (document.querySelector("#time-left").style.color = "white");
      //switch back to session time logic if in break time
      if (
        timerLabel.innerHTML == "break" &&
        minutes.innerHTML == "00" &&
        seconds.innerHTML == "00"
      ) {
        document.querySelector("#time-left").style.color = "white";
        timerLabel.innerHTML = "session";
        if (breakDuration.innerHTML < 10) {
          minute = sessionDuration.innerHTML;
          minutes.innerHTML = "0" + minute;
        } else {
          minute = sessionDuration.innerHTML;
          minutes.innerHTML = minute;
        }
      }
      //switch to break time logic
      if (minutes.innerHTML == "00" && seconds.innerHTML == "00") {
        document.querySelector("#time-left").style.color = "white";
        timerLabel.innerHTML = "break";
        if (breakDuration.innerHTML < 10) {
          minute = breakDuration.innerHTML;
          minutes.innerHTML = "0" + minute;
        } else {
          minute = breakDuration.innerHTML;
          minutes.innerHTML = minute;
        }
      }
    }, 1000);
  }
  //pause countdown
  else {
    pausePlay.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
    clearInterval(myInterval);
    myInterval = -1;
  }
});

//reset
reset.addEventListener("click", () => {
  clearInterval(myInterval);
  pausePlay.innerHTML = ` <i class="fa fa-play fa-2x"></i>`;
  timerLabel.innerHTML = "session";
  sessionDuration.innerHTML = 25;
  breakDuration.innerHTML = 5;
  minutes.innerHTML = sessionDuration.innerHTML;
  seconds.innerHTML = "0" + 0;
});
