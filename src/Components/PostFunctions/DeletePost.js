import deleteIcon from '../../Images/delete-icon.svg';

function PostDelete({ postId, getPosts }) {
	function handleClick() {
		fetch('https://treeter-api.vercel.app/posts/' + postId + '/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					window.location.reload();
				} else {
					alert("Cannot delete other's posts");
				}
			});
	}

	return (
		<button className="footer-button delete-button" onClick={handleClick}>
			<img src={deleteIcon} alt="Delete" />
		</button>
	);
}

export default PostDelete;
