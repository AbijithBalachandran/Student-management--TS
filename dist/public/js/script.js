"use strict";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[^\s][a-zA-Z\s]*[^\s]$/;
const mobileRegex = /^(\+?\d{1,3}[- ]?)?(7|8|9)\d{10}$/;
const passwordRegex = /^(?=.[a-zA-Z])(?=.\d)[a-zA-Z\d]{8,}$/;
// Register Validation
let SignupForm = document.querySelector('#SignupForm');
let emailError = document.getElementById('invalid-email');
let passwordError = document.getElementById('invalid-pass');
let nameError = document.getElementById('invalid-name');
SignupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let email = SignupForm.querySelector('#email').value;
    let password = SignupForm.querySelector('#password').value;
    let name = SignupForm.querySelector('#name').value;
    if (!nameRegex.test(name)) {
        nameError.style.display = 'inline';
        passwordError.style.display = 'none';
        emailError.style.display = 'none';
    }
    if (!emailRegex.test(email)) {
        emailError.style.display = 'inline';
        passwordError.style.display = 'none';
        nameError.style.display = 'none';
    }
    else if (password.length < 8) {
        passwordError.style.display = 'inline';
        emailError.style.display = 'none';
        nameError.style.display = 'none';
    }
    else {
        passwordError.style.display = 'none';
        passwordError.style.display = 'none';
        SignupForm.submit();
    }
});
//# sourceMappingURL=script.js.map