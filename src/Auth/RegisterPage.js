import { useState } from 'react';

function RegisterPage({ setCurrentPage }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		fetch('https://treeter-api.vercel.app/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: username, password: password }),
		});
		setCurrentPage('LoginPage');
	}

	return (
		<div className="authentication-page">
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
			<button onClick={() => setCurrentPage('StartPage')}>Back</button>
		</div>
	);
}

export default RegisterPage;
