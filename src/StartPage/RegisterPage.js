function RegisterPage({ setCurrentPage }) {
	return (
		<div>
			<h1>Register</h1>
			<button onClick={() => setCurrentPage('StartPage')}>Back</button>
		</div>
	);
}

export default RegisterPage;
