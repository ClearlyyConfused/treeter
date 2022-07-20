function HomePageSidebar({ setCurrentPage }) {
	function switchToHome() {}

	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage-sidebar">
			<h2>Welcome {localStorage.getItem('username')}</h2>
			<a href="#root">
				<button onClick={switchToHome}>HOME</button>
			</a>
			<button onClick={logout}>LOGOUT</button>
		</div>
	);
}

export default HomePageSidebar;
