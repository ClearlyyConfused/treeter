function PostLikes({ postId, getPosts }) {
	function handleClick() {
		fetch('https://treeter-api.herokuapp.com/posts/' + postId + '/like', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		}).then(() => {
			getPosts();
		});
	}

	return <button onClick={handleClick}>Like</button>;
}

export default PostLikes;
