import { useState } from 'react';

function PostForm({ getPosts }) {
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
		fetch('https://treeter-api.vercel.app/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ content: content, timestamp: timestamp }),
		}).then(() => getPosts());
		setContent('');
	}

	return (
		<div className="post-form">
			<form onSubmit={handleSubmit}>
				<textarea
					type="text"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					maxLength="250"
					placeholder="Send out a Treet!"
				/>
				<button type="submit">Treet</button>
			</form>
		</div>
	);
}

export default PostForm;
