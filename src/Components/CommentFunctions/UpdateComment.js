import { useState } from 'react';
import editIcon from '../../Images/edit-icon.svg';

function CommentUpdateForm({ comment, postId }) {
	const [content, setContent] = useState('');
	const [display, setDisplay] = useState(true);

	function handleSubmit(e) {
		e.preventDefault();
		let timestamp = new Date();
		timestamp = timestamp.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});
		fetch('https://treeter-api.onrender.com/posts/' + postId + '/comment/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ content: content, timestamp: timestamp, comment: comment }),
		}).then(() => window.location.reload());
		setContent('');
	}

	return (
		<div>
			{display ? (
				<button className="footer-button" onClick={() => setDisplay(false)}>
					<img className="like-icon" src={editIcon} alt="Like" />
				</button>
			) : (
				<div className="post-form post-update-form">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							maxLength="250"
						/>
						<button type="submit">Update</button>
						<button onClick={() => setDisplay(true)}>Cancel</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default CommentUpdateForm;
