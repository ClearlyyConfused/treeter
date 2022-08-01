import { useState } from 'react';

function CommentForm({ postId, getComments }) {
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
		fetch('https://treeter-api.herokuapp.com/posts/' + postId + '/comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ content: content, timestamp: timestamp }),
		}).then(() => getComments());
		setContent('');
	}

	return (
		<div className="post-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					maxLength="250"
				/>
				<button type="submit">Comment</button>
			</form>
		</div>
	);
}

export default CommentForm;