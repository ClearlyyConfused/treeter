function PostDelete({ postId, getPosts }) {
	function handleClick() {
		fetch('https://treeter-api.herokuapp.com/posts/' + postId + '/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		}).then(() => getPosts());
	}

	return <button onClick={handleClick}>Del</button>;
}

export default PostDelete;
