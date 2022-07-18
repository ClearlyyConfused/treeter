import Posts from './Posts';
import PostForm from './PostForm';

function HomePage() {
	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage">
			<button onClick={logout}>Logout</button>
			<PostForm />
			<Posts />
		</div>
	);
}

export default HomePage;
