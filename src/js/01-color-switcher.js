const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let inrervalId = null;

function onBtnStartClick() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function onBtnStopClick() {
  btnStop.disabled = true;
  btnStart.disabled = false;
  clearInterval(intervalId);
}
