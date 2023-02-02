import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const seconds = document.querySelector('span[data-seconds]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }

    btnStart.addEventListener('click', startTimer);
    function startTimer() {
      const timerId = setInterval(() => {
        const diff = selectedDates[0] - Date.now();
        console.log(diff);
        if (diff < 1000) {
          clearInterval(timerId);
        }
        days.textContent = addLeadingZero(
          Math.floor(diff / (1000 * 60 * 60 * 24))
        );
        hours.textContent = addLeadingZero(
          Math.floor((diff / (1000 * 60 * 60)) % 24)
        );
        minutes.textContent = addLeadingZero(
          Math.floor((diff / (1000 * 60)) % 60)
        );
        seconds.textContent = addLeadingZero(Math.floor((diff / 1000) % 60));
      }, 1000);
    }
  },
});

function addLeadingZero(number) {
  return String(number).padStart(2, 0);
}
