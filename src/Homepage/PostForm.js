import { useState } from 'react';

function PostForm() {
	const [content, setContent] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		fetch('https://treeter-api.herokuapp.com/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ content: content }),
		});
		window.location.reload();
	}

	return (
		<div className="post-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button type="submit">Treet</button>
			</form>
		</div>
	);
}

export default PostForm;
