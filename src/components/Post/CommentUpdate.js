import CommentUpdateForm from '../subcomponents/CommentUpdateForm';
import editIcon from '../../images/pencil.svg';
import { useState } from 'react';

function CommentUpdate({ comment, postId }) {
	const [display, setDisplay] = useState(true);

	return (
		<div>
			{display ? (
				<button className="footer-button" onClick={() => setDisplay(false)}>
					<img className="like-icon" src={editIcon} alt="Like" />
				</button>
			) : (
				<CommentUpdateForm comment={comment} postId={postId} setDisplay={setDisplay} />
			)}
		</div>
	);
}

export default CommentUpdate;
