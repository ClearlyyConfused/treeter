import commentIcon from '../images/chat.svg';

function PostComments({ postId, getPosts, postComments }) {
	return (
		<a href={postId}>
			<img className="like-icon" src={commentIcon} alt="Like" />
			<p>{postComments.length}</p>
		</a>
	);
}

export default PostComments;
