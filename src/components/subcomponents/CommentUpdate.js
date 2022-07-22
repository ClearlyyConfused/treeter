import commentIcon from '../../images/chat.svg';
import './subcomponents.css';

function CommentUpdate({ postId }) {
	return (
		<a className="footer-button" href={postId + '/update'}>
			<img className="like-icon" src={commentIcon} alt="Like" />
		</a>
	);
}

export default CommentUpdate;
