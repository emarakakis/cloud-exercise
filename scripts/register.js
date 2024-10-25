import { registerAccount } from "./login.js";

document.querySelector('.js-register-button')
    .addEventListener('click', () => {
        const name = document.querySelector('.js-account-name').value
        const password = document.querySelector('.js-account-password').value

        if(!name || !password){
            return;
        }

        registerAccount(name, password);
        window.location.href = "../html/login.html";
    })