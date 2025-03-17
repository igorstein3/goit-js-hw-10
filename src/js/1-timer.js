'use strict';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconErr from "../img/alert-icon.svg";

let userSelectedDate = null;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  dateTimeInput: document.querySelector("#datetime-picker"),
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function timeToSTR({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  return { days, hours, minutes, seconds }
};

const iziToastOptions = {
          message: 'Please choose a date in the future',
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '150%',
          backgroundColor: '#ef4040',
          iconColor: '#fff',
          iconUrl: iconErr,
          close: true,
          closeOnEscape: true,
          closeOnClick: true,
          position: 'topRight',
        };

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const result = tick();
      if (result <= 0) {
        iziToast.show(iziToastOptions);
         refs.startBtn.disabled = true;
        refs.startBtn.classList.add('disable-btn')
      } else {
         refs.startBtn.disabled = false;
        refs.startBtn.classList.remove('disable-btn')
       }
  },
};


function tick() {
  const nowDate = Date.now();
  const userSelectedDateUNIX = userSelectedDate.getTime();
  return userSelectedDateUNIX - nowDate;
};

const fp = flatpickr(refs.dateTimeInput, options);  // flatpickr

const timer = {
  intervalId: null,
  start() {
    refs.startBtn.disabled = true;
    refs.startBtn.classList.add('disable-btn');
    refs.dateTimeInput.disabled = true;
    refs.dateTimeInput.classList.add('disable-input')
    this.intervalId = setInterval(() => {
      const timerValue = tick();
      const padeStartedDate = timeToSTR(convertMs(timerValue));
      refs.days.textContent = padeStartedDate.days;
      refs.hours.textContent = padeStartedDate.hours;
      refs.minutes.textContent = padeStartedDate.minutes;
      refs.seconds.textContent = padeStartedDate.seconds;
      if (timerValue < 1000) {
        clearInterval(this.intervalId); 
        refs.dateTimeInput.disabled = false;
        refs.dateTimeInput.classList.remove('disable-input')
      }
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});






