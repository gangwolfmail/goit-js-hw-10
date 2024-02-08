import iziToast from 'izitoast';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const time = form.elements.delay.value;
  const state = form.elements.state.value;

  // if (time < 0) {
  //   iziToast.show({
  //     icon: 'icon-false',
  //     backgroundColor: '#FC5A5A',
  //     message: `Delay cannot be negative`,
  //     messageColor: '#FAFAFB',
  //     messageSize: '16px',
  //     position: 'topCenter',
  //     close: false,
  //     closeOnClick: true,
  //   });
  //   return;
  // }

  function promise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve();
        }
        reject();
      }, time);
    });
  }

  promise()
    .then(value => successfulMessage(time))
    .catch(error => errorMessage(time));
});

function errorMessage(delay) {
  iziToast.show({
    icon: 'icon-false',
    backgroundColor: '#FC5A5A',
    message: `Rejected promise in ${delay} ms`,
    messageColor: '#FAFAFB',
    messageSize: '16px',
    position: 'topCenter',
    close: false,
  });
}

function successfulMessage(delay) {
  iziToast.show({
    icon: 'icon-false',
    backgroundColor: '#82C43C',
    message: `Fulfilled promise in ${delay} ms`,
    messageColor: '#FAFAFB',
    messageSize: '16px',
    position: 'topCenter',
    close: false,
  });
}
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const form = document.querySelector('.form');

// function createPromise(event) {
//   event.preventDefault();
//   const delay = form.delay.value;
//   const state = form.state.value;

//   const promise = new Promise((resolve, reject) => {
//     if (state === 'fulfilled') {
//       setTimeout(() => resolve(delay), delay);
//     } else if (state === 'rejected') {
//       setTimeout(() => reject(delay), delay);
//     }
//   });

//   promise
//     .then(delay => {
//       iziToast.success({
//         message: `✅ Fulfilled promise in ${delay}ms`,
//         position: 'bottomCenter',
//       });
//     })
//     .catch(delay => {
//       iziToast.error({
//         message: `❌Rejected promise in ${delay}ms`,
//         position: 'bottomCenter',
//       });
//     });
// }

// form.addEventListener('submit', createPromise);
