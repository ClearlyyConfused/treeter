import commentIcon from '../../Images/comment-icon-filled.svg';
import commentIcon2 from '../../Images/comment-icon-outline.svg';

function PostComments({ post }) {
	const commentIconSrc = post.comments.length > 0 ? commentIcon : commentIcon2;

	return (
		<div className="footer-button">
			<img className="like-icon" src={commentIconSrc} alt="Like" />
			<p>{post.comments.length}</p>
		</div>
	);
}

export default PostComments;
