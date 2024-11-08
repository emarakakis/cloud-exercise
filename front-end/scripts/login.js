const login_button = document.querySelector('.js-login-button')

if(login_button){

	userLogin()
}

async function userLogin(){
	login_button.addEventListener('click', async (button) => {
		const name = document.querySelector('.js-login-name').value;
		const password = document.querySelector('.js-login-password').value;
		const queryResult = await isAccountRegistered(name,password)
		if(queryResult){
			window.location.href = '../html/index.html'
		}
		else{
			console.log("Try Again!");
		}
	})
}
	
async function isAccountRegistered(name, password) {
	try {
		const response = await fetch("http://backend:3000/users/login-user", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, password })
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json(); // Parse the response as JSON
		if (data.success){
			console.log(data.userId);
			localStorage.setItem('userId', JSON.stringify(data.userId));
			localStorage.setItem('user', JSON.stringify(name));
		}
		
		return data

	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
		return false;
	}
}

export async function registerAccount(name, password) {
	const response = await fetch("http://backend:3000/users/register-user", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, password })
	});

	// Check if the response is okay (status 200-299)
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	// Parse the response as JSON
	const result = await response.json();
	return result.success; // `success` is the property you sent back from the server
}


function saveAccounts(){
	localStorage.setItem('registeredAccounts', JSON.stringify(registered_accounts));
}