import likeIconEmpty from '../../images/cards-heart-outline.svg';
import likeIconFilled from '../../images/cards-heart.svg';

function PostLikes({ postId, getPosts, postLikes }) {
	function handleClick() {
		fetch('https://treeter-api.herokuapp.com/posts/' + postId + '/like', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		}).then(() => getPosts());
	}

	const likeIconSrc = postLikes.includes(localStorage.getItem('username'))
		? likeIconFilled
		: likeIconEmpty;
	return (
		<button onClick={handleClick}>
			<img className="like-icon" src={likeIconSrc} alt="Like" />
			<p>{postLikes.length}</p>
		</button>
	);
}

export default PostLikes;
