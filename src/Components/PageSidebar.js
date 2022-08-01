function PageSidebar() {
	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage-sidebar">
			<h2>{localStorage.getItem('username')}</h2>
			<div className="sidebar-buttons">
				<a href="/">
					<button>HOME</button>
				</a>
				<a href="/">
					<button onClick={logout}>LOGOUT</button>
				</a>
			</div>
		</div>
	);
}

export default PageSidebar;
