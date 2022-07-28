import deleteIcon from '../../Images/delete-icon.svg';

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

	return (
		<button className="footer-button" onClick={handleClick}>
			<img src={deleteIcon} alt="Delete" />
		</button>
	);
}

export default PostDelete;
