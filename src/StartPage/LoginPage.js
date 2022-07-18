function LoginPage({ setCurrentPage }) {
	return (
		<div>
			<h1>Login</h1>
			<button onClick={() => setCurrentPage('StartPage')}>Back</button>
		</div>
	);
}

export default LoginPage;
