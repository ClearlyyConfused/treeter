import commentIcon from '../../Images/comment-icon-filled.svg';
import commentIcon2 from '../../Images/comment-icon-outline.svg';

function PostComments({ post }) {
	const commentIconSrc = post.comments.length > 0 ? commentIcon : commentIcon2;

	return (
		<a className="footer-button" href={post._id}>
			<img className="like-icon" src={commentIconSrc} alt="Like" />
			<p>{post.comments.length}</p>
		</a>
	);
}

export default PostComments;
