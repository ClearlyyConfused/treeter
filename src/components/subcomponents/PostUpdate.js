import editIcon from '../../images/pencil.svg';
import './subcomponents.css';
import { useState } from 'react';
import PostUpdateForm from './PostUpdateForm';

function PostUpdate({ postId }) {
	const [display, setDisplay] = useState(true);

	return (
		<div>
			{display ? (
				<button className="footer-button" onClick={() => setDisplay(false)}>
					<img className="like-icon" src={editIcon} alt="Like" />
				</button>
			) : (
				<PostUpdateForm postId={postId} setDisplay={setDisplay} />
			)}
		</div>
	);
}

export default PostUpdate;
