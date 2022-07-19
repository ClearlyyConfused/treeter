function HomePageSidebar() {
	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage-sidebar">
			<button onClick={logout}>LOGOUT</button>
		</div>
	);
}

export default HomePageSidebar;
