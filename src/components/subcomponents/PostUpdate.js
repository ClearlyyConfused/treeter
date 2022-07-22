import commentIcon from '../../images/chat.svg';
import './subcomponents.css';
import { useState } from 'react';

function PostUpdate({ postId }) {
	const [display, setDisplay] = useState(false);

	return (
		<a className="footer-button" href={postId + '/update'}>
			<img className="like-icon" src={commentIcon} alt="Like" />
		</a>
	);
}

export default PostUpdate;
