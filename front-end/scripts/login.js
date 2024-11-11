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
			window.location.href = './index.html'
		}
		else{
			console.log("helloo")
			document.querySelector('.js-login-name').value = '';	
			document.querySelector('.js-login-password').value = '';
		}
	})
}
	
async function isAccountRegistered(name, password) {
	try {
		const response = await fetch("http://localhost:3000/users/login-user", {
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
			localStorage.setItem('userId', JSON.stringify(data.userId));
			localStorage.setItem('user', JSON.stringify(name));
			return data
		}
		else{
			window.alert("User doesn't exist");
		}
		
		

	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
		return false;
	}
}

export async function registerAccount(name, password) {
	const response = await fetch("http://localhost:3000/users/register-user", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, password })
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result = await response.json();
	return result.success;
}

export function hasUserToken(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        return false;
    } else {
        return true;
    }
}