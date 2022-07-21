import commentIcon from '../../images/chat.svg';
import commentIcon2 from '../../images/chat-outline.svg';

function PostComments({ postId, getPosts, postComments }) {
	const commentIconSrc = postComments.length > 0 ? commentIcon : commentIcon2;

	return (
		<a href={postId}>
			<img className="like-icon" src={commentIconSrc} alt="Like" />
			<p>{postComments.length}</p>
		</a>
	);
}

export default PostComments;
