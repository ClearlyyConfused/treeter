function PageSidebar() {
	function logout() {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="homepage-sidebar">
			<h2>Welcome {localStorage.getItem('username')}</h2>
			<a href="/treeter">
				<button>HOME</button>
			</a>
			<button onClick={logout}>LOGOUT</button>
		</div>
	);
}

export default PageSidebar;
