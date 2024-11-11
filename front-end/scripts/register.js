import { registerAccount } from "./login.js";

document.querySelector('.js-register-button')
    .addEventListener('click', async () => {
        const name = document.querySelector('.js-account-name').value
        const password = document.querySelector('.js-account-password').value

        if(!name || !password){
            return;
        }

        const res = await registerAccount(name, password);

        if(res){
            window.location.href = "./login.html";
        } else {
            document.querySelector('.js-account-name').value = '';
            document.querySelector('.js-account-password').value = '';
            window.alert('Error, Username is already in! try again!');
        }
    })