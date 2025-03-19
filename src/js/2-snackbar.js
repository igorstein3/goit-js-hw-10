'use strict'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector('.form'),
    submitBtn: document.querySelector('[data-begin]'),
};

function createPromise(value, delay, success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve(value);
            } else {
                reject(value);
            }
        }, delay);
    });
};

refs.form.addEventListener('submit', (e) => {
    e.preventDefault();
    let success = undefined;
  const radios = refs.form.elements.state;
    for (let radio of radios) {      
        if (radio.checked) {
            if (radio.value === 'fulfilled') {
                success = true;
            } else if (radio.value === 'rejected') {
                success = false;
            };
        }
    };   
    const delay = Number(e.currentTarget.elements.delay.value);
    const promise = createPromise(delay, delay, success);
    promise.then(value => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${value} ms`,
            progressBar: false,
            position: 'topRight',
        });
    })
        .catch(err => {
            iziToast.error({
                message: `❌ Rejected promise in ${err} ms`,
                progressBar: false,
                position: 'topRight',
            });
        });
});


