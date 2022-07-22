import commentIcon from '../../images/chat.svg';
import commentIcon2 from '../../images/chat-outline.svg';
import './subcomponents.css';

function PostComments({ postId, getPosts, postComments }) {
	const commentIconSrc = postComments.length > 0 ? commentIcon : commentIcon2;

	return (
		<a className="footer-button" href={postId}>
			<img className="like-icon" src={commentIconSrc} alt="Like" />
			<p>{postComments.length}</p>
		</a>
	);
}

export default PostComments;
