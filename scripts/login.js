let registered_accounts = JSON.parse(localStorage.getItem('registeredAccounts')) || [{
	name: 'admin',
	password: 'admin'
}]

const login_button = document.querySelector('.js-login-button')

if(login_button){
	login_button.addEventListener('click', (button) => {
		const name = document.querySelector('.js-login-name').value;
		const password = document.querySelector('.js-login-password').value;
		if(isAccountRegistered(name,password)){
			localStorage.setItem('user', JSON.stringify(name));
			window.location.href = '../html/index.html'
		}
		else{
			console.log("Try Again!");
		}
	})
}
	
function isAccountRegistered(name, password) {
	return registered_accounts.some(account => 
			account.name === name && account.password === password
	);
}

export function registerAccount(name, password) {
	registered_accounts.push({name, password});
	saveAccounts();
}

function saveAccounts(){
	localStorage.setItem('registeredAccounts', JSON.stringify(registered_accounts));
}