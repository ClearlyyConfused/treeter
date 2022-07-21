import './startpage.css';
import { useState } from 'react';

import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

function StartPage() {
	const [currentPage, setCurrentPage] = useState('StartPage');

	if (currentPage === 'RegisterPage') {
		return <RegisterPage setCurrentPage={setCurrentPage} />;
	}
	if (currentPage === 'LoginPage') {
		return <LoginPage setCurrentPage={setCurrentPage} />;
	}
	if (currentPage === 'StartPage') {
		return (
			<div className="start-page">
				<div className="start-page-banner"></div>
				<div className="start-page-content">
					<h1>HAPPENING TODAY</h1>
					<div>
						<h2>JOIN TREETER NOW</h2>
						<button onClick={() => setCurrentPage('RegisterPage')}>REGISTER</button>
					</div>
					<div>
						<h3>ALREADY HAVE AN ACCOUNT?</h3>
						<button onClick={() => setCurrentPage('LoginPage')}>LOGIN</button>
					</div>
				</div>
			</div>
		);
	}
}

export default StartPage;
