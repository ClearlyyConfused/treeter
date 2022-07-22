import deleteIcon from '../../images/delete.svg';

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

	return (
		<button className="footer-button" onClick={handleClick}>
			<img src={deleteIcon} alt="Delete" />
		</button>
	);
}

export default CommentDelete;
