function CommentDelete({ postId, getComments, comment }) {
	function handleClick() {
		fetch('https://treeter-api.herokuapp.com/posts/' + postId + '/comment/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ comment: comment }),
		}).then(() => getComments());
	}

	return <button onClick={handleClick}>Del</button>;
}

export default CommentDelete;
