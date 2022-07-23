import { useState } from 'react';

function CommentUpdateForm({ comment, postId, setDisplay }) {
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
		fetch('https://treeter-api.herokuapp.com/posts/' + postId + '/comment/update', {
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
	);
}

export default CommentUpdateForm;
