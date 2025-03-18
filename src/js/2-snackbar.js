'use strict'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    submitBtn: document.querySelector('[data-begin]'),
    fulfilledRadio: document.querySelector('input[value="fulfilled"]'),
    rejectedRadio: document.querySelector('input[value="rejected"]'),
    delayInput: document.querySelector('[required]'),
};
let delay = null;
let successValue = undefined;
let valueText = '';


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

refs.delayInput.addEventListener('input', (e) => {
    delay = Number(e.currentTarget.value);
    console.log(delay);
});

refs.fulfilledRadio.addEventListener('click', (e) => {
    successValue = true;
    valueText = `✅ Fulfilled promise in ${delay} ms`;
});

refs.rejectedRadio.addEventListener('click', (e) => {
    successValue = false;
    valueText = `❌ Rejected promise in ${delay} ms`;
});

refs.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const promise = createPromise(valueText, delay, successValue);
    promise.then(value => {
        iziToast.success({
            message: valueText,
            progressBar: false,
            close: true,
            position: 'topRight',
        });
    })
        .catch(err => {
            iziToast.error({
                message: valueText,
                progressBar: false,
                close: true,
                position: 'topRight',
            });
        });
});


