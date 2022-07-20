function HomePageSidebar({ setCurrentPage }) {
	function switchToHome() {}

	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage-sidebar">
			<a href="#root">
				<button onClick={switchToHome}>HOME</button>
			</a>
			<button onClick={logout}>LOGOUT</button>
		</div>
	);
}

export default HomePageSidebar;
