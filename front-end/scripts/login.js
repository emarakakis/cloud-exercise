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
			fetch("http://localhost:3000/users", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Set the content type to JSON
				},
				body: JSON.stringify({ username: name })
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text(); // Or response.json() if you're expecting JSON
			})
			.then(data => {
				console.log(data); // This will log the response from the server
				window.location.href = '../html/index.html';
			})
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
			
			//window.location.href = '../html/index.html'
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