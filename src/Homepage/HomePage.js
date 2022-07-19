import Posts from './Posts';
import './homepage.css';

function HomePage() {
	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage">
			<Posts />
			<div className="homepage-sidebar">
				<button onClick={logout}>LOGOUT</button>
			</div>
		</div>
	);
}

export default HomePage;
