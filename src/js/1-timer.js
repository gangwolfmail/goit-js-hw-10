import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button');
const inputData = document.querySelector('input#datetime-picker');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

let countdownInterval;

function startTimer() {
  countdownInterval = setInterval(updateTimer, 1000, userSelectedDate);
}

function updateTimer(endDate) {
  const currentDate = new Date();
  const remainingTime = endDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysData.textContent = addLeadingZero(days);
    hoursData.textContent = addLeadingZero(hours);
    minutesData.textContent = addLeadingZero(minutes);
    secondsData.textContent = addLeadingZero(seconds);
  }

  if (remainingTime <= 0) {
    stopTimer();
  }
}

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer();
  }
});

function stopTimer() {
  if (countdownInterval) {
    clearInterval(countdownInterval);

    daysData.textContent = '00';
    hoursData.textContent = '00';
    minutesData.textContent = '00';
    secondsData.textContent = '00';

    countdownInterval = null;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(inputData, options);

// import flatpickr from 'flatpickr';
// import iziToast from 'izitoast';

// const dataTimePicker = document.getElementById('datetime-picker');
// const startBtn = document.querySelector('[data-start]'),
//   dataDays = document.querySelector('span[data-days]'),
//   dataHours = document.querySelector('span[data-hours]'),
//   dataMinutes = document.querySelector('span[data-minutes]'),
//   dataSeconds = document.querySelector('span[data-seconds]');

// let userSelectedDate;

// disableBtn();

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] > new Date()) {
//       userSelectedDate = selectedDates[0];
//       activeBtn();
//       iziToast.show({
//         icon: 'icon-true',
//         backgroundColor: '#82C43C',
//         message: 'You can start the countdown',
//         messageColor: '#FAFAFB',
//         messageSize: '16px',
//         position: 'topRight',
//         close: false,
//       });
//     } else {
//       iziToast.show({
//         icon: 'icon-false',
//         backgroundColor: '#EF4040',
//         message: 'Please choose a date in the future',
//         messageColor: '#FFBEBE',
//         messageSize: '16px',
//         position: 'topRight',
//         close: false,
//       });
//       disableBtn();
//     }
//   },
// };

// startBtn.addEventListener('click', event => {
//   event.preventDefault();

//   const backReferenceTimer = setInterval(() => {
//     disableBtn();
//     const backReference = userSelectedDate - Date.now();
//     const convertDate = convertMs(backReference);
//     if (backReference > 0) {
//       dataDays.textContent = addLeadingZero(convertDate.days);
//       dataHours.textContent = addLeadingZero(convertDate.hours);
//       dataMinutes.textContent = addLeadingZero(convertDate.minutes);
//       dataSeconds.textContent = addLeadingZero(convertDate.seconds);
//     } else {
//       clearInterval(backReferenceTimer);
//       iziToast.show({
//         icon: 'icon-true',
//         backgroundColor: '#82C43C',
//         message: 'Date came, timer  has stopped',
//         messageColor: '#FAFAFB',
//         messageSize: '16px',
//         position: 'topRight',
//         close: false,
//       });
//     }
//   }, 1000);
// });

// function disableBtn() {
//   startBtn.disabled = true;
//   startBtn.style.background = '#cfcfcf';
//   startBtn.style.color = '#989898';
// }

// function activeBtn() {
//   startBtn.disabled = false;
//   startBtn.style.background = '#4e75ff';
//   startBtn.style.color = '#fff';
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// flatpickr(dataTimePicker, options);

// import flatpickr from 'flatpickr';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import 'flatpickr/dist/flatpickr.min.css';

// const startButton = document.querySelector('button');
// const inputData = document.querySelector('input#datetime-picker');
// const daysData = document.querySelector('[data-days]');
// const hoursData = document.querySelector('[data-hours]');
// const minutesData = document.querySelector('[data-minutes]');
// const secondsData = document.querySelector('[data-seconds]');
// const timer = document.querySelector('.timer');

// let userSelectedDate;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     userSelectedDate = selectedDates[0];
//     if (userSelectedDate < Date.now()) {
//       iziToast.error({
//         message: 'Please choose a date in the future',
//         position: 'topRight',
//       });
//       startButton.disabled = true;
//     } else {
//       startButton.disabled = false;
//     }
//   },
// };

// let countdownInterval;

// function startTimer() {
//   countdownInterval = setInterval(updateTimer, 1000, userSelectedDate);
// }

// function updateTimer(endDate) {
//   const currentDate = new Date();
//   const remainingTime = endDate - currentDate;
//   const { days, hours, minutes, seconds } = convertMs(remainingTime);

//   if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
//     daysData.textContent = addLeadingZero(days);
//     hoursData.textContent = addLeadingZero(hours);
//     minutesData.textContent = addLeadingZero(minutes);
//     secondsData.textContent = addLeadingZero(seconds);
//   }

//   if (remainingTime <= 0) {
//     stopTimer();
//   }
// }

// startButton.addEventListener('click', () => {
//   if (userSelectedDate) {
//     startTimer();
//   }
// });

// function stopTimer() {
//   if (countdownInterval) {
//     clearInterval(countdownInterval);

//     daysData.textContent = '00';
//     hoursData.textContent = '00';
//     minutesData.textContent = '00';
//     secondsData.textContent = '00';

//     countdownInterval = null;
//   }
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// flatpickr(inputData, options);

// *==========================

// import flatpickr from 'flatpickr';
// import iziToast from 'izitoast';

// const dataTimePicker = document.getElementById('datetime-picker');
// const startBtn = document.querySelector('[data-start]'),
//   dataDays = document.querySelector('span[data-days]'),
//   dataHours = document.querySelector('span[data-hours]'),
//   dataMinutes = document.querySelector('span[data-minutes]'),
//   dataSeconds = document.querySelector('span[data-seconds]');

// let userSelectedDate;

// toggleButton(false);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const currentDate = new Date();
//     if (selectedDates[0] > currentDate) {
//       userSelectedDate = selectedDates[0];
//       toggleButton(true);
//       iziToast.info({
//         message: 'You can start the countdown',
//         position: 'topRight',
//       });
//     } else {
//       iziToast.error({
//         message: 'Please choose a date in the future',
//         position: 'topRight',
//       });
//       toggleButton(false);
//     }
//   },
// };

// flatpickr(dataTimePicker, options);

// startBtn.addEventListener('click', event => {
//   event.preventDefault();
//   if (!userSelectedDate || userSelectedDate <= new Date()) {
//     iziToast.error({
//       message: 'Please choose a date in the future',
//       position: 'topRight',
//     });
//     return;
//   }

//   toggleButton(false);
//   const backReferenceTimer = setInterval(() => {
//     const timeDifference = userSelectedDate - new Date();
//     if (timeDifference > 0) {
//       const timeParts = convertMs(timeDifference);
//       dataDays.textContent = addLeadingZero(timeParts.days);
//       dataHours.textContent = addLeadingZero(timeParts.hours);
//       dataMinutes.textContent = addLeadingZero(timeParts.minutes);
//       dataSeconds.textContent = addLeadingZero(timeParts.seconds);
//     } else {
//       clearInterval(backReferenceTimer);
//       iziToast.info({
//         message: 'The time has come',
//         position: 'topRight',
//       });
//     }
//   }, 1000);
// });

// function toggleButton(enabled) {
//   startBtn.disabled = !enabled;
//   startBtn.classList.toggle('button-active', enabled);
//   startBtn.classList.toggle('button-disabled', !enabled);
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor((ms % hour) / minute);
//   const seconds = Math.floor((ms % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// * ==========
// import flatpickr from 'flatpickr';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import 'flatpickr/dist/flatpickr.min.css';

// const dataTimePicker = document.getElementById('datetime-picker');
// const startBtn = document.querySelector('[data-start]');
// const dataDays = document.querySelector('[data-days]');
// const dataHours = document.querySelector('[data-hours]');
// const dataMinutes = document.querySelector('[data-minutes]');
// const dataSeconds = document.querySelector('[data-seconds]');

// let userSelectedDate;
// let countdownInterval;

// function toggleButton(enabled) {
//   startBtn.disabled = !enabled;
//   startBtn.classList.toggle('button-active', enabled);
//   startBtn.classList.toggle('button-disabled', !enabled);
// }

// toggleButton(false);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const currentDate = new Date();
//     if (selectedDates[0] > currentDate) {
//       userSelectedDate = selectedDates[0];
//       toggleButton(true);
//       iziToast.info({
//         message: 'You can start the countdown',
//         position: 'topRight',
//       });
//     } else {
//       iziToast.error({
//         message: 'Please choose a date in the future',
//         position: 'topRight',
//       });
//       toggleButton(false);
//     }
//   },
// };

// flatpickr(dataTimePicker, options);

// startBtn.addEventListener('click', event => {
//   event.preventDefault();
//   if (!userSelectedDate || userSelectedDate <= new Date()) {
//     iziToast.error({
//       message: 'Please choose a date in the future',
//       position: 'topRight',
//     });
//     return;
//   }

//   toggleButton(false);
//   countdownInterval = setInterval(updateTimer, 1000);
// });

// function updateTimer() {
//   const timeDifference = userSelectedDate - new Date();
//   if (timeDifference > 0) {
//     const timeParts = convertMs(timeDifference);
//     dataDays.textContent = addLeadingZero(timeParts.days);
//     dataHours.textContent = addLeadingZero(timeParts.hours);
//     dataMinutes.textContent = addLeadingZero(timeParts.minutes);
//     dataSeconds.textContent = addLeadingZero(timeParts.seconds);
//   } else {
//     clearInterval(countdownInterval);
//     iziToast.info({
//       message: 'The time has gone',
//       position: 'topRight',
//     });
//     toggleButton(false);
//   }
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor((ms % hour) / minute);
//   const seconds = Math.floor((ms % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
