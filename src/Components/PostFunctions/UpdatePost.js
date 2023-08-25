import { useState } from 'react';
import editIcon from '../../Images/edit-icon.svg';

function PostUpdate({ postId }) {
	const [display, setDisplay] = useState(true);
	const [content, setContent] = useState('');

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
		fetch('https://treeter-api.vercel.app/posts/' + postId + '/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ content: content, timestamp: timestamp }),
		}).then(() => (window.location.href = '/'));
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

export default PostUpdate;
