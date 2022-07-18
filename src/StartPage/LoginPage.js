import { useState } from 'react';

function LoginPage({ setCurrentPage }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		const req = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: username, password: password }),
		};
		fetch('https://treetter.herokuapp.com/login', req)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					localStorage.setItem('token', data.token);
					setCurrentPage('StartPage');
					window.location.reload();
				}
			});
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="text"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
			{error}
			<button onClick={() => setCurrentPage('StartPage')}>Back</button>
		</div>
	);
}

export default LoginPage;
