import likeIconEmpty from '../../Images/like-icon-outline.svg';
import likeIconFilled from '../../Images/like-icon-filled.svg';

function PostLikes({ post, getPosts }) {
	function handleClick() {
		fetch('https://treeter-api.vercel.app/posts/' + post._id + '/like', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		}).then(() => getPosts());
	}

	const likeIconSrc = post.likes.includes(localStorage.getItem('username')) ? likeIconFilled : likeIconEmpty;
	return (
		<button className="footer-button" onClick={handleClick}>
			<img className="like-icon" src={likeIconSrc} alt="Like" />
			<p>{post.likes.length}</p>
		</button>
	);
}

export default PostLikes;
