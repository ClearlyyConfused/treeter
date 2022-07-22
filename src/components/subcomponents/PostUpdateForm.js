import { useState } from 'react';
import { useParams } from 'react-router-dom';

function PostUpdate() {
	const { postId } = useParams();
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
		fetch('https://treeter-api.herokuapp.com/posts/' + postId + '/update', {
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
		<div className="post-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					maxLength="250"
				/>
				<button type="submit">Update</button>
			</form>
		</div>
	);
}

export default PostUpdate;
