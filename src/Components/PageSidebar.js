function PageSidebar() {
	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage-sidebar">
			<h2>Welcome {localStorage.getItem('username')}</h2>
			<a href="/">
				<button>HOME</button>
			</a>
			<a href="/">
				<button onClick={logout}>LOGOUT</button>
			</a>
		</div>
	);
}

export default PageSidebar;
